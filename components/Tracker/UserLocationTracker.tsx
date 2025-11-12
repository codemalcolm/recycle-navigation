import UserMarker from "../Markers/UserMarker";

interface UserLocationTrackerProps {
  coordinates: Coordinates;
  isTracking: boolean;
}

const UserLocationTracker: React.FC<UserLocationTrackerProps> = ({
  coordinates,
  isTracking,
}) => {
  const isLocationReady = coordinates.lat !== null && coordinates.long !== null;

  // conversion to Marker "position" data type
  const markerPosition: [number, number] | null = isLocationReady
    ? [coordinates.lat!, coordinates.long!]
    : null;

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
