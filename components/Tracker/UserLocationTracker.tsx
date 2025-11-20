import { useEffect, useRef } from "react";
import UserMarker from "../Markers/UserMarker";
import { useMap } from "react-leaflet";
import { Coordinates } from "@/types/global";
import { useUserCoordinates } from "@/context/UserCoordinatesProvider";

interface UserLocationTrackerProps {
  isTracking: boolean;
}

const UserLocationTracker: React.FC<UserLocationTrackerProps> = ({
  isTracking,
}) => {
  const map = useMap();
  const flyToTriggered = useRef<boolean>(false); // needed ref to no trigger useEffect twice
  const [contextCoordinates] = useUserCoordinates();
  const markerPosition: Coordinates = contextCoordinates!;

  useEffect(() => {
    if (markerPosition && !flyToTriggered.current) {
      map.flyTo(markerPosition, 13, { duration: 1.5 });
      flyToTriggered.current = true;
    }
  }, [map, markerPosition]);

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
