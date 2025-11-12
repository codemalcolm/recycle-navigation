import { userMarkerIcon } from "@/lib/exports/user-marker-icon";
import { Marker } from "react-leaflet";

interface UserMarkerProps {
  position: [number, number];
}

const UserMarker = ({ position }: UserMarkerProps) => {
  return <Marker position={position} icon={userMarkerIcon}></Marker>;
};

export default UserMarker;
