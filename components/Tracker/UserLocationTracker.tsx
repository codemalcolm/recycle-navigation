import { useEffect } from "react";
import UserMarker from "../Markers/UserMarker";
import { useMap } from "react-leaflet";
import { Coordinates } from "@/types/global";

interface UserLocationTrackerProps {
  coordinates: Coordinates | null;
  isTracking: boolean;
}

const UserLocationTracker: React.FC<UserLocationTrackerProps> = ({
  coordinates,
  isTracking,
}) => {
  const map = useMap();

  const markerPosition: Coordinates = coordinates!;

  useEffect(() => {
    if (markerPosition) map.flyTo(markerPosition, 13, { duration: 1.5 });
  });

  if (!isTracking) return null;

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
