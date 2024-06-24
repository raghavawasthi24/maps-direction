import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import React from "react";

const mapContainerStyle = {
  height: "90vh",
  width: "100%",
};

export default function Maps({
  response,
  origin,
  destination,
  stops,
  directionsCallback,
  mode,
}) {
  console.log(response);
  return (
    <div className="w-full md:w-1/2 h-full p-5">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={{ lat: 20.5937, lng: 78.9629 }} // Center of India
      >
        {origin && destination && mode && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              waypoints: stops
                .filter((stop) => stop !== "")
                .map((stop) => ({ location: stop, stopover: true })),
              // travelMode: mode,
            }}
            callback={directionsCallback}
          />
        )}
        {response !== null && <DirectionsRenderer directions={response} />}
      </GoogleMap>
    </div>
  );
}
