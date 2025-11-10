import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkLocationTracking = async () => {
  try {
    const geoLocationPermission = await navigator.permissions.query({
      name: "geolocation",
    });

    return geoLocationPermission.state === "prompt" ||
      geoLocationPermission.state === "denied"
      ? false
      : true;
  } catch (error) {
    throw new Error(`Error occured during geoLocation permission: ${error}`);
  }
};

type LocationUpdateCallback = (location: { long: number; lat: number }) => void;

// todo : fix bug on watchGeoLocation with prompting user immedietely on page load 
export const watchGeoLocation = (
  onLocationUpdate: LocationUpdateCallback
): (() => void) => {
  // checking if navigator is supported by browser
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported for this Browser/OS.");
    return () => {};
  }
  let long: number;
  let lat: number;

  /// success function is called on each location change of the user
  function success(position: GeolocationPosition) {
    console.log("Geo location active");
    console.log(position);
    ({ longitude: long, latitude: lat } = position.coords);

    onLocationUpdate({ long, lat });
  }

  // start watching the position
  const watchId = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  });

  function error() {
    // todo : change this to a popup toast
    if (watchId !== undefined) {
      navigator.geolocation.clearWatch(watchId); // clearing the watchPosition on error
    }
    alert("Sorry, no position available.");
  }

  // return a cleanup function to stop watching later
  return () => {
    if (watchId !== undefined) {
      navigator.geolocation.clearWatch(watchId);
      console.log("Location watch cleared.");
    }
  };
};
