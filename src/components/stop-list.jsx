import React from "react";
import Input from "./input";


export default function StopsList({ stops, setStops, onPlacesChanged }) {
  const handleLocationChange = (newLocation, index) => {
    const newStops = [...stops];
    newStops[index] = newLocation;
    setStops(newStops);
  };

  const handleRemoveStop = (index) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  return (
    <div>
      {stops.map((stop, index) => (
        <div key={index} className="form-group">
          <Input
            label={`Stop ${index + 1}`}
            location={stop}
            setLocation={(newLocation) =>
              handleLocationChange(newLocation, index)
            }
            onPlacesChanged={(ref) => onPlacesChanged(ref, index)}
          />
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
