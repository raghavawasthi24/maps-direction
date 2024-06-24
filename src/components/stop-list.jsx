import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FaCircleMinus } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

export default function StopsList({ stops, setStops }) {
  const handleLocationChange = (ref, index) => {
    const place = ref.current.getPlace();
    if (place && place.formatted_address) {
      const newStops = [...stops];
      newStops[index] = place.formatted_address;
      setStops(newStops);
    }
  };

  const handleRemoveStop = (index) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const originRef = useRef(null);
  console.log(stops);

  const addStop = () => {
    console.log(stops);
    setStops([...stops, ""]);
  };

  return (
    <div className="w-full md:w-[90%] flex flex-col">
      {stops.map((stop, index) => (
        <div key={index} className="">
          <label htmlFor="originInput" className="block mb-2">
            Stops
          </label>
          <div className="flex items-center gap-2">
            <Autocomplete
              onLoad={(autocomplete) => (originRef.current = autocomplete)}
              onPlaceChanged={() => handleLocationChange(originRef, index)}
              className="w-full"
            >
              <input
                id="stops"
                type="text"
                placeholder="Enter Stop"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Autocomplete>
            <button onClick={() => handleRemoveStop(index)}>
              <FaCircleMinus className="text-red-500" />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addStop}
        className="flex items-center gap-1 self-end mt-2"
      >
        <CiCirclePlus className="" />
        Add another Stop
      </button>
    </div>
  );
}
