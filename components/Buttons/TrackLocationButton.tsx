import { Button } from "../ui/button";
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
    <div className="relative h-full select-none">
      <Button
        className="absolute left-[50%] top-[85%] translate-x-[-50%] cursor-pointer z-400"
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
