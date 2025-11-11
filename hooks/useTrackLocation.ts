import { watchGeoLocation } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

type CoordsType = {
  lat: number | null;
  long: number | null;
};

export const useTrackLocation = () => {
  const [coords, setCoords] = useState<CoordsType>({ lat: null, long: null });
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const stopTrackingRef = useRef<() => void | null>(null);

  const handleLocationUpdate = useCallback(
    ({ long, lat }: { long: number; lat: number }) => {
      setCoords({ long, lat });
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
    startTracking,
    stopTracking,
    coords,
    isTracking,
  };
};
