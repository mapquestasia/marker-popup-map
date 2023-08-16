import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import placesData from "../assets/places.json";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon; //Set all marker to this icon

export const LeafletMap = () => {
  const position = [13.7442, 100.5626];

  const handleMapClick = (map) => {
    console.log(map);
    map.target.on("click", (e) => {
      const { lat, lng } = e.latlng;
      //L.marker([lat, lng], { DefaultIcon }).addTo(map.target);
      L.popup({ className: "position-popup" })
        .setLatLng([lat, lng])
        .setContent(
          `
                <h4>Position</h4>
                <p>Latitude: ${lat}</p>
                <p>Longitude: ${lng}</p>
              `
        )
        .openOn(map.target);
    });
  };

  return (
    <MapContainer
      className="container"
      center={position}
      zoom={14}
      scrollWheelZoom={true}
      whenReady={(map) => {
        handleMapClick(map);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {placesData.map((place, index) => {
        return (
          <Marker key={index} position={[place.latitude, place.longitude]}>
            <Popup>
              <div className="place-info">
                <h3>{place.name}</h3>
                <p>
                  {place.latitude}, {place.longitude}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
