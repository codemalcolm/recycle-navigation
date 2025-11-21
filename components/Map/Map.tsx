import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { leafletSettings } from "@/lib/leaflet.settings";
import UserLocationTracker from "../Tracker/UserLocationTracker";
import { useTrackLocation } from "@/hooks/useTrackLocation";
import { Coordinates } from "@/types/global";
import TrackLocationButton from "../Buttons/TrackLocationButton";
import LoadedMarkers from "../LoadedMarkers/LoadedMarkers";
import MarkerPopup from "../Popup/MarkerPopup";

const Map = () => {
  const START_POSITION: Coordinates = [50.0755, 14.4378];
  // isTracking from hook
  const { isTracking, startTracking } = useTrackLocation();

  // bybass react-leaflet error -> react-leaflet settings
  useEffect(() => {
    L.Icon.Default.mergeOptions({ leafletSettings });
  }, []);

  return (
    <div className="relative">
      {/*  MapContainer is the main wrapper, handling the map instance creation */}
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

        {isTracking && <UserLocationTracker isTracking />}
        <LoadedMarkers />
        <MarkerPopup />

        {/* <MapClickHandler /> */}

        {!isTracking && (
          <TrackLocationButton startTracking={startTracking} isTracking />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
