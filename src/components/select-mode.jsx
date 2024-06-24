import React from "react";
import { FaWalking } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaBicycle } from "react-icons/fa";

export default function SelectMode({ mode, setMode }) {
  const modes = [
    {
      type: "DRIVING",
      icon: <FaCar className="w-6 h-6" />,
    },
    {
      type: "WALKING",
      icon: <FaWalking className="w-6 h-6" />,
    },
    {
      type: "BICYCLING",
      icon: <FaBicycle className="w-6 h-6" />,
    },
  ];
  return (
    <div>
      <p>Select your mode:</p>
      <div className="mb-4 flex gap-4 mt-3">
        {modes.map((ele) => (
          <button
            key={ele}
            className={` p-2 rounded-full ${
              ele.type === mode
                ? "border-2 border-red-700"
                : "border border-black"
            }`}
            onClick={() => setMode(ele.type)}
          >
            {ele.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
