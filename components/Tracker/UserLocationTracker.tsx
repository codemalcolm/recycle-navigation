import { useEffect, useState } from "react";
import UserMarker from "../Markers/UserMarker";
import { watchGeoLocation } from "@/lib/utils";

interface LocationCoords {
  long: number | null;
  lat: number | null;
}

const UserLocationTracker: React.FC = () => {
  // callback needed for watchLocation
  const [coordinates, setCoordinates] = useState<LocationCoords>({
    long: null,
    lat: null,
  });

  const handleLocationUpdate = ({
    long,
    lat,
  }: {
    long: number;
    lat: number;
  }) => {
    setCoordinates({ long, lat });
  };

  useEffect(() => {
    const stopTracking = watchGeoLocation(handleLocationUpdate);

    return () => {
      stopTracking();
      console.log("Unmount : tracking stopped");
    };
  }, []);

  const isLocationReady = coordinates.lat !== null && coordinates.long !== null;

  // conversion to Marker "position" data type
  const markerPosition: [number, number] | null = isLocationReady
    ? [coordinates.lat!, coordinates.long!]
    : null;

  return (
    <>
      {markerPosition ? (
        <UserMarker position={markerPosition} />
      ) : (
        <p>Waiting for user location...</p>
      )}
    </>
  );
};

export default UserLocationTracker;
