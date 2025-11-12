import { watchGeoLocation } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

export const useTrackLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    long: null,
  });
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const stopTrackingRef = useRef<() => void | null>(null);

  const handleLocationUpdate = useCallback(
    ({ long, lat }: { long: number; lat: number }) => {
      setCoordinates({ long, lat });
    },
    []
  );

  const startTracking = () => {
    if (isTracking) return; // disallow more watches
    // using utility funcion to track user location
    const stopFunc = watchGeoLocation(handleLocationUpdate);
    stopTrackingRef.current = stopFunc;
    setIsTracking(true);
  };

  const stopTracking = useCallback(() => {
    // reference clean up
    if (stopTrackingRef.current) {
      stopTrackingRef.current();
      stopTrackingRef.current = null;
      setIsTracking(false);
      console.warn("User trackign stopped by callback");
    }
  }, []);

  return {
    coordinates,
    isTracking,
    startTracking,
    stopTracking,
  };
};
