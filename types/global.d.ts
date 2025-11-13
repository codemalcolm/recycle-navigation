import { LatLngExpression } from "leaflet";

type Coordinates = LatLngExpression;

type CoordinatesObject = {
  lat: number | null;
  long: number | null;
};

type OsmObject = RecyclingContainer | WasteBasket;

interface RecyclingContainer {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: Tags;
}

interface WasteBasket {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: Tags;
}

interface Tags {
  amenity: string;
  recycling_beverage_cartons?: string;
  recyclingcooking_oil?: string;
  recycling_glass?: string;
  recycling_paper?: string;
  recycling_plastic?: string;
  recycling_type?: string;
}
