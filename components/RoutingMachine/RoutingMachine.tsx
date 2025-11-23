"use client";
import { Coordinates } from "@/types/global";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "./index.css";

type RoutingMachineProps = {
  startPosition: Coordinates;
  endPosition: Coordinates;
};

const RoutingMachine = ({
  startPosition,
  endPosition,
}: RoutingMachineProps) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    // alternative for buggy remove Layer -> needed to cleanup any existing instance before creating a newone
    if (routingControlRef.current) {
      routingControlRef.current.remove();
      routingControlRef.current = null;
    }
    if (startPosition && endPosition) {
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(startPosition), L.latLng(endPosition)],
        show: false,
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null, // this prevents leaflet-router-machine to render it's own markers
        lineOptions: {
          styles: [{ color: "#00dc00", weight: 4 }],
        },
      }).addTo(map);
      // storing routing instance in a ref
      routingControlRef.current = routingControl;

      // cleanup routing instance on unmount
      return () => {
        if (routingControlRef.current) {
          routingControlRef.current.remove();
          routingControlRef.current = null;
        }
      };
    }
  }, [map, startPosition, endPosition]);
  console.log(startPosition, "START");
  console.log(endPosition, "END");
  return null;
};

export default RoutingMachine;
