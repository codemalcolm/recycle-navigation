import database from "../../db/db.json";
import { OsmObject } from "@/types/global";
import ClickedMarker from "../Markers/ClickedMarker";

const LoadedMarkers = () => {
  return (
    <>
      {(database as OsmObject[]).map((element) => (
        <ClickedMarker key={element.id} markerData={element} />
      ))}
    </>
  );
};

export default LoadedMarkers;
