"use client";

import { OsmObject } from "@/types/global";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import database from "../../db/db.json";
import { useMap } from "react-leaflet";
import ROUTES from "@/constants";
import { Button } from "../ui/button";
import Image from "next/image";
import { transformOsmTags, transformString } from "@/lib/utils";

const MarkerPopup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const markerIdString = searchParams.get("markerId"); // read markerId
  const map = useMap();

  const [markerData, setMarkerData] = useState<OsmObject | null>(null);

  useEffect(() => {
    if (markerIdString) {
      console.log(`Marker ID found in URL: ${markerIdString}. Showing popup.`);
      const markerId = Number(markerIdString);
      // fetch data by id
      const data = database.find((e) => e?.id === markerId);
      if (!data) {
        setMarkerData(null); // error is expected here
      }
      setMarkerData(data!);
    } else {
      setMarkerData(null);
    }
  }, [markerIdString]);

  // Handler to close the modal by removing the parameter from the URL
  const handleClose = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.delete("markerId"); // Remove the parameter

    //push the removed search param without a full reload
    router.push(ROUTES.MARKER_SEARCH_PARAMS(currentSearchParams.toString()), {
      scroll: false,
    });
  };

  if (!markerData) {
    return null; // Don't render if no marker id is present
  } else {
    map.flyTo([markerData.lat!, markerData.lon!], 15, { duration: 0.68 });
  }

  // Basic styling for a bottom-up popup
  return (
    <div
      className="flex-column absolute left-[50%] translate-x-[-50%] max-w-[750px] bg-white p-5 z-1000 transition-transform bottom-0 right-0 border border-red-500 rounded-t-lg"
      style={{
        transition: "transform 0.7s ease-in",
        // The presence of markerData implies the popup is "open"
        transform: markerIdString ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <div className="flex justify-between items-center">
        <h3>Marker Details:</h3>
        <Button size={null} variant="ghost" onClick={handleClose}>
          <Image
            width={16}
            height={16}
            src={"/images/icons/close-icon.svg"}
            alt="Close button icon"
          />
        </Button>
      </div>

      <p>ID: {markerData?.id}</p>
      <p>
        Recyclation type:{" "}
        {markerData.tags?.amenity === "waste_basket"
          ? "Trash Can"
          : "Recyclation Container"}
      </p>
      <p>Recyclables:</p>
      <div className="flex gap-1">
        {Object.entries(markerData.tags!).length === 1
          ? "Mix"
          : transformOsmTags(markerData.tags!).map((recyclables) => (
              <p className="w-fit" key={recyclables}>
                {`<${recyclables}>`}
              </p>
            ))}
      </div>
    </div>
  );
};

export default MarkerPopup;
