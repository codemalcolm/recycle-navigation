import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { leafletSettings } from "@/lib/leaflet.settings";
import UserLocationTracker from "../Tracker/UserLocationTracker";
import { Button } from "../ui/button";
import { useTrackLocation } from "@/hooks/useTrackLocation";
import { useGeoLocPermission } from "@/hooks/useGeoLocPermission";
import { cn } from "@/lib/utils";
import { Coordinates } from "@/types/global";
import TrackLocationButton from "../Buttons/TrackLocationButton";
import LoadedMarkers from "../LoadedMarkers/LoadedMarkers";
import MarkerPopup from "../Popup/MarkerPopup";

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(
    null
  );

  const START_POSITION: Coordinates = [50.0755, 14.4378];

  // todo : change to -> fetch data on click
  // function MapClickHandler() {
  //   useMapEvents({
  //     click: (e) => {
  //       if (markerPosition) {
  //         console.log("already have a marker");
  //       }
  //       const clickedPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
  //       setMarkerPosition(clickedPosition);
  //     },
  //   });
  //   return null;
  // }

  // check permission from user to track location
  const permissionStatus = useGeoLocPermission();

  // coordinates from hook
  const { coordinates, isTracking, startTracking } = useTrackLocation();

  // bybass react-leaflet error -> react-leaflet settings
  useEffect(() => {
    L.Icon.Default.mergeOptions({ leafletSettings });
  }, []);

  let buttonText = "Allow GeoLocation";
  let isButtonVisible = true;

  if (isTracking && permissionStatus === "granted") {
    buttonText = "Location Tracking Active";
    isButtonVisible = false;
  } else if (permissionStatus === "denied") {
    buttonText = "Location Denied (Check Browser Settings)";
    isButtonVisible = true;
  } else if (permissionStatus === "unsupported") {
    buttonText = "Geolocation Not Supported";
    isButtonVisible = true;
  }

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

        {/* {markerPosition && <UserMarker position={markerPosition} />} */}
        <UserLocationTracker coordinates={coordinates} isTracking />
        <LoadedMarkers />
        <MarkerPopup />

        {/* <MapClickHandler /> */}
        {isButtonVisible && (
          <TrackLocationButton
            startTracking={startTracking}
            buttonText={buttonText}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
