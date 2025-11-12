import { userMarkerIcon } from "@/lib/exports/user-marker-icon";
import { Coordinates } from "@/types/global";
import { Marker } from "react-leaflet";

interface UserMarkerProps {
  position: Coordinates;
}

const UserMarker = ({ position }: UserMarkerProps) => {
  return <Marker position={position} icon={userMarkerIcon}></Marker>;
};

export default UserMarker;
