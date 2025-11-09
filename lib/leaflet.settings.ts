import L from "leaflet";

export const GENERIC_MARKER = {
  WIDTH: 36,
  HEIGHT: 36,
  IMAGE_URL: "/images/generic-marker.png",
  RETINA_URL: "/images/generic-marker.png",
  SHADOW_URL: "/images/marker-shadow.png",
};

export const USER_MARKER = {
  IMAGE_URL: "/images/user-marker.svg",
  RETINA_URL: "/images/user-marker.svg",
  SHADOW_URL: "/images/marker-shadow.png",
};

export const leafletSettings: L.IconOptions = {
  iconUrl: GENERIC_MARKER.IMAGE_URL,
  iconRetinaUrl: GENERIC_MARKER.RETINA_URL,
  shadowUrl: GENERIC_MARKER.SHADOW_URL,
  iconSize: [GENERIC_MARKER.WIDTH, GENERIC_MARKER.HEIGHT],
  iconAnchor: [GENERIC_MARKER.WIDTH / 2, GENERIC_MARKER.HEIGHT],
  popupAnchor: [0, -GENERIC_MARKER.HEIGHT / 2],
  tooltipAnchor: [GENERIC_MARKER.WIDTH, GENERIC_MARKER.HEIGHT],
  shadowSize: [GENERIC_MARKER.WIDTH, GENERIC_MARKER.HEIGHT],
  shadowAnchor: [
    GENERIC_MARKER.WIDTH / 4,
    GENERIC_MARKER.HEIGHT / 2 + GENERIC_MARKER.HEIGHT / 1.72,
  ],
};

export const userMarkerSettings: L.IconOptions = {
  ...leafletSettings, // same settings
  // different images
  iconUrl: USER_MARKER.IMAGE_URL,
  iconRetinaUrl: USER_MARKER.RETINA_URL,
  shadowUrl: USER_MARKER.SHADOW_URL,
};

// default leaflet settings
L.Icon.Default.prototype.options.iconUrl = GENERIC_MARKER.IMAGE_URL;
L.Icon.Default.prototype.options.iconRetinaUrl = GENERIC_MARKER.RETINA_URL;
L.Icon.Default.prototype.options.shadowUrl = GENERIC_MARKER.SHADOW_URL;
L.Icon.Default.prototype.options.iconSize = [
  GENERIC_MARKER.WIDTH,
  GENERIC_MARKER.HEIGHT,
];
L.Icon.Default.prototype.options.iconAnchor = [
  GENERIC_MARKER.WIDTH / 2,
  GENERIC_MARKER.HEIGHT,
];
L.Icon.Default.prototype.options.popupAnchor = [0, -GENERIC_MARKER.HEIGHT / 2];
L.Icon.Default.prototype.options.tooltipAnchor = [
  GENERIC_MARKER.WIDTH,
  GENERIC_MARKER.HEIGHT,
];
L.Icon.Default.prototype.options.shadowSize = [
  GENERIC_MARKER.WIDTH,
  GENERIC_MARKER.HEIGHT,
];
L.Icon.Default.prototype.options.shadowAnchor = [
  GENERIC_MARKER.WIDTH / 4,
  GENERIC_MARKER.HEIGHT / 2 + GENERIC_MARKER.HEIGHT / 1.72,
];