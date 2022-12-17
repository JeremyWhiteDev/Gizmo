import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";

export const GimzoMap = () => {
  const mapCenter = useMemo(() => ({ lat: 44, lng: -80 }), []);

  const [markerOpenId, setMarkerOpenId] = useState("");

  const handleMarkerOpen = (key) => {
    setMarkerOpenId(key);
  };

  return (
    <GoogleMap
      zoom={10}
      center={mapCenter}
      mapContainerClassName="w-screen h-screen rounded-lg"
    >
      <Marker
        position={{ lat: 44.91231, lng: -80.1290301928234234243 }}
        animation={"DROP"}
        onClick={() => handleMarkerOpen(1)}
      >
        {markerOpenId === 1 && (
          <InfoWindow
            position={{ lat: 44.21231, lng: -80.1290301928234234243 }}
            onCloseClick={() => setMarkerOpenId("")}
          >
            <div>
              <h1>InfoWindow 1</h1>
            </div>
          </InfoWindow>
        )}
      </Marker>
      <Marker
        position={{ lat: 44.225345134, lng: -80.21 }}
        animation={"DROP"}
        onClick={() => handleMarkerOpen(2)}
      >
        {markerOpenId === 2 && (
          <InfoWindow
            position={{ lat: 44.22, lng: -80.21 }}
            onCloseClick={() => setMarkerOpenId("")}
          >
            <div>
              <h1>InfoWindow 2</h1>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
};
