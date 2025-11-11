import { useEffect, useState } from "react";

type PermissionState = "granted" | "denied" | "prompt" | "unsupported";

export const useGeoLocPermission = (): PermissionState => {
  // get initial permission (needed for useEffect error bypass)
  const initPermission = (): PermissionState => {
    if (!navigator.geolocation || !navigator.permissions) {
      return "unsupported";
    }
    return "prompt";
  };

  const [permission, setPermission] = useState<PermissionState>(initPermission);
  useEffect(() => {
    // exit useEffect immedietely on "unsupported"
    if (permission === "unsupported") {
      return;
    }

    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((permissionStatus) => {
        setPermission(permissionStatus?.state as PermissionState);

        // changing state if user changes permissions mid session
        permissionStatus.onchange = () => {
          setPermission(permissionStatus?.state as PermissionState);
        };
      })
      .catch((error) => {
        console.error(error);
        setPermission("unsupported");
        throw new Error(
          `Error occured during geoLocation permission: ${error}`
        );
      });
  }, [permission]);
  return permission;
};
