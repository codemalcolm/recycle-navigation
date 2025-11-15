import { LatLngExpression } from "leaflet";

type Coordinates = LatLngExpression;

type CoordinatesObject = {
  lat: number | null;
  long: number | null;
};

type OsmObject = RecyclePoint;

interface RecyclePoint {
  type: string | "";
  id: number | null;
  lat: number | null;
  lon: number | null;
  tags: Tags | null;
}

interface Tags {
  amenity: string;
  "recycling:beverage_cartons"?: string;
  "recycling:cooking_oil"?: string;
  "recycling:glass"?: string;
  "recycling:paper"?: string;
  "recycling:plastic"?: string;
  "recycling:type"?: string;
}
