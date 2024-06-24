import { Autocomplete } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import StopsList from "./stop-list";

export default function AddVenues({
  origin,
  destination,
  setOrigin,
  setDestination,
  setResponse,
  stops,
  setStops,
  directionsCallback,
}) {
  const [distance, setDistance] = useState("");
  const [error, setError] = useState("");

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const handlePlaceChanged = (ref, setState) => {
    const place = ref.current.getPlace();
    if (place && place.formatted_address) {
      setState(place.formatted_address);
    }
  };

  // const calculateRoute = () => {
  //   if (origin !== "" && destination !== "") {
  //     const directionsService = new window.google.maps.DirectionsService();

  //     const waypoints = stops
  //       .filter((stop) => stop !== "")
  //       .map((stop) => ({ location: stop, stopover: true }));

  //     directionsService.route(
  //       {
  //         origin: origin,
  //         destination: destination,
  //         waypoints: waypoints,
  //         travelMode: window.google.maps.TravelMode.DRIVING,
  //       }
  //       (result, status) => {
  //         if (status === window.google.maps.DirectionsStatus.OK) {
  //           setResponse(result);
  //           setDistance(
  //             result.routes[0].legs.reduce(
  //               (total, leg) => total + leg.distance.value,
  //               0
  //             ) / 1000
  //           );
  //           setError("");
  //         } else {
  //           setError(`Error fetching directions: ${status}`);
  //           setResponse(null);
  //         }
  //       }
  //     );
  //   } else {
  //     setError("Please enter both origin and destination.");
  //   }
  // };

  const calculateRoute = () => {
    console.log(stops);
    // if (!origin || !destination) {
    //   alert("Please enter both From and To locations.");
    //   return;
    // }

    const waypoints = stops
      .filter((stop) => stop !== "")
      .map((stop) => ({ location: stop, stopover: true }));

    // Call DirectionsService to calculate route
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
     (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
            setDistance(
              result.routes[0].legs.reduce(
                (total, leg) => total + leg.distance.value,
                0
              ) / 1000
            );
            setError("");
          } else {
            setError(`Error fetching directions: ${status}`);
            setResponse(null);
          }
        }
  );
   
  };

  const onPlacesChanged = (ref, index) => {
    const places = ref.getPlaces();
    if (places.length > 0) {
      const newStops = [...stops];
      if (index === -1) {
        setOrigin(places[0].formatted_address);
      } else if (index === -2) {
        setDestination(places[0].formatted_address);
      } else {
        newStops[index] = places[0].formatted_address;
        setStops(newStops);
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 p-5 flex flex-col">
      <div className="flex items-center h-fit">
        <div className="w-[50%]">
          <div className="mb-4 w-3/4">
            <label htmlFor="originInput" className="block font-bold mb-2">
              Origin
            </label>
            <Autocomplete
              onLoad={(autocomplete) => (originRef.current = autocomplete)}
              onPlaceChanged={() => handlePlaceChanged(originRef, setOrigin)}
            >
              <input
                id="originInput"
                type="text"
                placeholder="Enter origin"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Autocomplete>
          </div>

          <StopsList
            stops={stops}
            setStops={setStops}
            onPlacesChanged={onPlacesChanged}
            handlePlaceChanged={handlePlaceChanged}
          />

          <div className="mb-4 w-3/4">
            <label htmlFor="destinationInput" className="block font-bold mb-2">
              Destination
            </label>
            <Autocomplete
              onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
              onPlaceChanged={() =>
                handlePlaceChanged(destinationRef, setDestination)
              }
            >
              <input
                id="destinationInput"
                type="text"
                placeholder="Enter destination"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Autocomplete>
          </div>
        </div>
        <div className="">
          <button
            className="px-6 py-2 text-lg bg-blue-600 text-white rounded-full hover:bg-blue-700"
            onClick={calculateRoute}
          >
            Calculate
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {distance && (
        <div className="mt-8">
          <p className="text-lg font-bold text-blue-500">
            Distance: {distance} kms
          </p>
          <p>
            The Distance between <strong>{origin}</strong> and{" "}
            <strong>{destination}</strong> via the selected route is{" "}
            <strong>{distance}</strong> kms.
          </p>
        </div>
      )}
    </div>
  );
}
