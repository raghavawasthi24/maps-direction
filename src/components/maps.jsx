import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import React from 'react'

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

export default function Maps({response}) {
  return (
    <div className="w-full md:w-1/2 h-full p-5">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={{ lat: 20.5937, lng: 78.9629 }} // Center of India
      >
        {response !== null && <DirectionsRenderer directions={response} />}
      </GoogleMap>
    </div>
  );
}
