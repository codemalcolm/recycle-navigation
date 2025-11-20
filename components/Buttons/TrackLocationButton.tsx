import { useGeoLocPermission } from "@/hooks/useGeoLocPermission";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
type TrackLocationButtonProps = {
  isTracking: boolean;
  startTracking: () => void;
};

const TrackLocationButton = ({
  startTracking,
  isTracking,
}: TrackLocationButtonProps) => {
  // check permission from user to track location
  const permissionStatus = useGeoLocPermission();

  let buttonText = "Allow GeoLocation";
  let isButtonVisible = false;

  // permission handling
  if (isButtonVisible && isTracking && permissionStatus === "granted") {
    buttonText = "Location Tracking Active";
    isButtonVisible = false;
  } else if (permissionStatus === "denied") {
    buttonText = "Location Denied (Check Browser Settings)";
    isButtonVisible = true;
  } else if (permissionStatus === "unsupported") {
    buttonText = "Geolocation Not Supported";
    isButtonVisible = true;
  } else {
    isButtonVisible = true;
  }

  return (
    <div
      className={`${
        isButtonVisible ? "block" : "hidden"
      } relative h-full select-none`}
    >
      <Button
        id="kokotina"
        className={`absolute left-[50%] top-[85%] translate-x-[-50%] cursor-pointer z-400`}
        onClick={startTracking}
      >
        {buttonText}
        <Image
          className="ml-1"
          src="/images/icons/track-location.svg"
          alt="A different alt text"
          width={16}
          height={16}
        />
      </Button>
    </div>
  );
};

export default TrackLocationButton;
