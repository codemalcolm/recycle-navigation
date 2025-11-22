"use client";

import { Coordinates, OsmObject } from "@/types/global";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import database from "../../db/db.json";
import { useMap } from "react-leaflet";
import ROUTES from "@/constants";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn, transformOsmTags } from "@/lib/utils";
import { useUserCoordinates } from "@/context/UserCoordinatesProvider";
import RoutingMachine from "../RoutingMachine/RoutingMachine";

type RoutingWaypointsType = {
  startPosition: Coordinates;
  endPosition: Coordinates;
};

const MarkerPopup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [userCoordinates] = useUserCoordinates();
  const markerIdString = searchParams.get("markerId"); // read markerId
  const map = useMap();

  const [markerData, setMarkerData] = useState<OsmObject | null>(null);

  const [routingWaypoints, setRoutingWaypoints] =
    useState<RoutingWaypointsType | null>(null);

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
    return () => {
      setIsNavigating(false);
    };
  }, [markerIdString]);

  useEffect(() => {
    if (isNavigating) {
      console.log(`navigating to ...`);
    } else {
      console.log(`ending navigation to ...`);
    }
  }, [isNavigating]);

  // Handler to close the modal by removing the parameter from the URL
  const handleClose = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.delete("markerId"); // Remove the parameter

    //push the removed search param without a full reload
    router.push(ROUTES.MARKER_SEARCH_PARAMS(currentSearchParams.toString()), {
      scroll: false,
    });
  };

  const markerLocation: Coordinates = markerData! && [
    markerData!.lat!,
    markerData!.lon!,
  ];

  // handle setting coordinates that eventually triggers RoutingMachine
  const handleNavigation = () => {
    try {
      if (!userCoordinates && !markerData) {
        setIsNavigating(false);
        console.error("User Location not provided");
        alert("Allow location tracking to navigate to marker");
        // todo : add better error handling with toast popup
      } else {
        // set start & end coordinates
        const newWayPoints: RoutingWaypointsType = {
          startPosition: userCoordinates!,
          endPosition: markerLocation,
        };
        setRoutingWaypoints(newWayPoints);
        console.log(`navigating to ${[markerData!.lat!, markerData!.lon!]}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsNavigating((prevIsNavigating) => !prevIsNavigating);
    }
  };

  if (!markerData) {
    return null; // Don't render if no marker id is present
  } else {
    map.flyTo([markerData.lat!, markerData.lon!], 15, { duration: 0.68 });
  }

  // Basic styling for a bottom-up popup
  return (
    <>
      {routingWaypoints && userCoordinates && (
        <RoutingMachine
          startPosition={routingWaypoints.startPosition!}
          endPosition={routingWaypoints.endPosition!}
        />
      )}

      <div
        className="flex-column absolute left-[50%] translate-x-[-50%] max-w-[750px] z-500 bg-white p-5 transition-transform bottom-0 right-0 border border-red-500 rounded-t-lg w-full w-max-[750px]"
        style={{
          transition: "transform 0.7s ease-in",
          // The presence of markerData implies the popup is "open"
          transform: markerIdString ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="flex justify-between items-start">
          <Button
            disabled={!userCoordinates ? true : false}
            size="icon"
            variant="outline"
            onClick={handleNavigation}
            className={`
              bg-[#00dc00]
              border-2
              ${cn(isNavigating && "bg-white border-[#00dc00]")} 
              rounded-full w-14 h-14 cursor-pointer 
            `}
          >
            {/* Navigation icon cannot be added as external svg due to color change on navigation state */}
            {/* Solved by inline svg */}
            <svg
              width="16"
              height="16"
              fill="white"
              className={`${cn(isNavigating && "fill-[#00dc00]")}`}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.00039 15.2481C7.64739 15.2481 6.78138 15.1021 6.33238 13.7521L5.12338 10.1251L1.49538 8.9161C0.251385 8.5011 0.026385 7.7441 0.00238504 7.3291C-0.021615 6.9141 0.116385 6.1361 1.30438 5.5821L12.6794 0.273099C13.7104 -0.205901 14.6014 -0.0359014 15.0274 0.635099C15.2514 0.986099 15.4234 1.6051 14.9744 2.5681L9.66539 13.9431C9.13638 15.0781 8.39338 15.2481 8.00039 15.2481ZM2.61039 7.1801L6.70439 8.5431L8.06939 12.6361L12.8444 2.4031L2.61039 7.1801Z" />
            </svg>
          </Button>
          <Button size={null} variant="ghost" onClick={handleClose}>
            <Image
              width={16}
              height={16}
              src={"/images/icons/close-icon.svg"}
              alt="Close button icon"
            />
          </Button>
        </div>
        <h3 className="mt-4">Marker Details:</h3>

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
    </>
  );
};

export default MarkerPopup;
