import { Coordinates, OsmObject } from "@/types/global";
import { Marker } from "react-leaflet";

type ClickedMarkerProps = {
  markerData: OsmObject;
};

const ClickedMarker = ({ markerData }: ClickedMarkerProps) => {
  const coordinates: Coordinates = [markerData.lat, markerData.lon];

  const eventHandlers = {
    click: () => {
      console.log("Marker clicked:", markerData);
    },
  };

  return (
    <Marker
      position={coordinates}
      title={markerData.tags?.amenity || "Amenity"}
      eventHandlers={eventHandlers}
    />
  );
};

export default ClickedMarker;
