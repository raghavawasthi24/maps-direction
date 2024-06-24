import React, { useRef } from "react";
import Input from "./input";
import { Autocomplete } from "@react-google-maps/api";

export default function StopsList({
  stops,
  setStops,
  onPlacesChanged,
  handlePlaceChanged,
}) {
  const handleLocationChange = (ref,index) => {
    const place = ref.current.getPlace();
    console.log(place.formatted_address);
    if (place && place.formatted_address) {
      // setState(place.formatted_address);
      const newStops = [...stops];
      newStops[index] = place.formatted_address;
      setStops(newStops);
    }

    // console.log(newLocation);
    // const newStops = [...stops];
    // newStops[index] = newLocation;
    // setStops(newStops);
  };

  const handleRemoveStop = (index) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const originRef = useRef(null);

  return (
    <div>
      {stops.map((stop, index) => (
        <div key={index} className="form-group">
          <label htmlFor="originInput" className="block font-bold mb-2">
            Stops
          </label>
          <Autocomplete
            onLoad={(autocomplete) => (originRef.current = autocomplete)}
            onPlaceChanged={() => handleLocationChange(originRef,index)}
          >
            <input
              id="stops"
              type="text"
              placeholder="Enter Stop"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </Autocomplete>
          <button
            className="btn btn-danger mt-2"
            onClick={() => handleRemoveStop(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
