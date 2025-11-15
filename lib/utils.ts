import { Coordinates, Tags } from "@/types/global";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformOsmTags = (tags: Tags) => {
  return Object.entries(tags)
    .filter((value) => value[0].startsWith("recycling:") && value[1] === "yes")
    .map((item) =>
      transformString(item[0].slice("recycling:".length, item[0].length))
    );
};

export const transformString = (str: string) => {
  return str.replace(/_(\w)|^(\w)/g, (match, p1, p2) => {
    if (p1) {
      return " " + p1.toUpperCase();
    }

    if (p2) {
      return p2.toUpperCase();
    }

    return match;
  });
};

type LocationUpdateCallback = (coords: Coordinates) => void;
// todo : change consolelogs to toasts
export const watchGeoLocation = (
  onLocationUpdate: LocationUpdateCallback
): (() => void) => {
  // checking if navigator is supported by browser
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported for this Browser/OS.");
    return () => {};
  }
  let lng: number;
  let lat: number;
  console.log("called");
  /// success function is called on each location change of the user
  function success(position: GeolocationPosition) {
    console.log("Geo location active");
    console.log(position);
    ({ longitude: lng, latitude: lat } = position.coords);

    onLocationUpdate([lat, lng]);
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
