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

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );
  // const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

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
    <div>
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
        <MapClickHandler />
        <div className="relative z-999 h-full">
          <Button
            className={cn(
              `absolute left-[50%] top-[85%] translate-x-[-50%] cursor-pointer`,
              isButtonVisible ? "block" : "hidden"
            )}
            onClick={startTracking}
          >
            {buttonText}
          </Button>
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;
