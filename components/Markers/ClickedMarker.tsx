import ROUTES from "@/constants";
import { Coordinates, OsmObject } from "@/types/global";
import { useRouter, useSearchParams } from "next/navigation";
import { Marker, useMap } from "react-leaflet";

type ClickedMarkerProps = {
  markerData: OsmObject;
};

const ClickedMarker = ({ markerData }: ClickedMarkerProps) => {
  const router = useRouter();
  const coordinates: Coordinates = [markerData.lat!, markerData.lon!];
  const searchParams = useSearchParams();
  const map = useMap();

  const eventHandlers = {
    click: () => {
      const currentSearchParams = new URLSearchParams(searchParams);
      currentSearchParams.set("markerId", markerData.id!.toString()); // set new search parameter "markerId"
      console.log("Marker clicked:", markerData);
      // push the markerData id parameter into app router
      router.push(
        ROUTES.MARKER_SEARCH_PARAMS(currentSearchParams.toString() as string),
        { scroll: false }
      );
      // map.flyTo(coordinates, 15, { duration: 0.68 });
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
