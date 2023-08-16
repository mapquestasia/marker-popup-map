import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

import icon from "../assets/marker-icon.png";
import { useEffect, useState } from "react";

import placesData from "../assets/places.json";

const mapStyle = {
  version: 8,
  name: "OSM",
  metadata: {},
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      minzoom: 0,
      maxzoom: 22,
    },
  },
  layers: [
    {
      id: "tiles-layer",
      type: "raster",
      source: "osm",
    },
  ],
  id: "osm-example",
};

export const MapLibreComponent = () => {
  const position = [13.7442, 100.5626];

  const [popupInfo, setPopupInfo] = useState(null);

  const handleMapClick = (map) => {
    map.target.on("click", (e) => {
      const { lat, lng } = e.lngLat;
      setPopupInfo({ name: "Position", latitude: lat, longitude: lng });
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: position[0],
        longitude: position[1],
        zoom: 14,
      }}
      mapStyle={mapStyle}
      onLoad={(map) => {
        handleMapClick(map);
      }}
    >
      {placesData.map((place, index) => {
        return (
          <Marker
            key={index}
            latitude={place.latitude}
            longitude={place.longitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(place);
            }}
          >
            <img src={icon} />
          </Marker>
        );
      })}

      {popupInfo && (
        <Popup
          latitude={popupInfo.latitude}
          longitude={popupInfo.longitude}
          offset={50}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          closeOnClick={false}
        >
          <div className="place-info">
            <h3>{popupInfo.name}</h3>
            <p>
              {popupInfo.latitude}, {popupInfo.longitude}
            </p>
          </div>
        </Popup>
      )}
      <NavigationControl />
    </Map>
  );
};
