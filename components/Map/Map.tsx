import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { leafletSettings } from "@/lib/leaflet.settings";
import UserMarker from "../Markers/UserMarker";

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  const START_POSITION: [number, number] = [50.0755, 14.4378];

  // todo : change to -> fetch data on click
  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        if (markerPosition) {
          console.log("already have a marker");
        }
        const clickedPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
        setMarkerPosition(clickedPosition);
      },
    });
    return null;
  }

  // bybass react-leaflet error -> react-leaflet settings
  useEffect(() => {
    L.Icon.Default.mergeOptions({ leafletSettings });
  }, []);

  return (
    // MapContainer is the main wrapper, handling the map instance creation
    <MapContainer
      center={START_POSITION}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[600px] w-full"
    >
      {/* TileLayer for base map tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markerPosition && <UserMarker position={markerPosition} />}

      <MapClickHandler />
    </MapContainer>
  );
};

export default Map;
