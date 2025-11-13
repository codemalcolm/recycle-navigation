import React from "react";
import { Button } from "../ui/button";
import trackLocationIcon from "/images/icons/track-location.svg";
import Image from "next/image";
type TrackLocationButtonProps = {
  startTracking: () => void;
  buttonText: string;
};

const TrackLocationButton = ({
  startTracking,
  buttonText,
}: TrackLocationButtonProps) => {
  return (
    <div className="relative z-999 h-full">
      <Button
        className="absolute left-[50%] top-[85%] translate-x-[-50%] cursor-pointer"
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
