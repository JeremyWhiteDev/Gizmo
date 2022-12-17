import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";

export const GimzoMap = ({ gizmos, userGeocode }) => {
  const mapCenter = useMemo(() => userGeocode, []);

  const [markerOpenId, setMarkerOpenId] = useState("");

  const handleMarkerOpen = (key) => {
    setMarkerOpenId(key);
  };

  const randomizeGeoCode = (geocode) => {
    const randomDecimal = Math.random() * 0.02;
    const randomOperator = Math.floor(Math.random() * 2);
    if (randomOperator === 1) {
      return geocode - randomDecimal;
    } else {
      return geocode + randomDecimal;
    }
  };
  const gizmosWithLocations = useMemo(() => {
    return gizmos.map((gizmo) => {
      const gizmoObj = { ...gizmo };
      const randomLat = randomizeGeoCode(gizmo.user.geocode.lat);
      const randomLng = randomizeGeoCode(gizmo.user.geocode.lng);
      gizmoObj.randomLat = randomLat;
      gizmoObj.randomLng = randomLng;
      return gizmoObj;
    });
  }, [gizmos]);

  //assume geocode is generated elsewhere.
  //receive geocode and set map center to be current user's address.
  //.map over filtered gizmos. in the infowindow have a name and pic of current item and link of current item.
  //have a randomizer function that randomizes the last 6 places behing the dicmal point and adds that to both the lat and long. lat: 36.173770, lng: -86.676430

  return (
    <GoogleMap
      zoom={12}
      center={mapCenter}
      mapContainerClassName="w-screen h-screen rounded-lg"
    >
      {gizmosWithLocations.length > 0 &&
        gizmosWithLocations.map((gizmo, key = gizmo.id) => {
          return (
            <React.Fragment key={gizmo.id}>
              <Marker
                position={{ lat: gizmo.randomLat, lng: gizmo.randomLng }}
                animation={"DROP"}
                onClick={() => handleMarkerOpen(gizmo.id)}
              >
                {markerOpenId === gizmo.id && (
                  <InfoWindow
                    position={{ lat: gizmo.randomLat, lng: gizmo.randomLng }}
                    onCloseClick={() => setMarkerOpenId("")}
                  >
                    <div>
                      <h3>{gizmo.nickName}</h3>
                      <img
                        className="w-40 rounded-lg object-cover"
                        src={gizmo.img}
                      />
                      <p>Model: {gizmo.model}</p>
                      <a
                        className="text-blue-500 underline underline-offset-4"
                        target="_blank"
                        href={`/gizmo-details/${gizmo.id}`}
                      >
                        Link to Gizmo Details
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            </React.Fragment>
          );
        })}
    </GoogleMap>
  );
};
