import React, { useCallback, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import Header from "./components/Header";
import AddVenues from "./components/add_venues";
import Maps from "./components/maps";

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [stops, setStops] = useState([]);
  const [mode, setMode] = useState("DRIVING");

  const directionsCallback = (result, status) => {
    if (status === "OK") {
      setResponse(result);
    } else {
      console.error("Directions request failed due to " + status);
    }
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <Header />

      <div className="flex flex-col items-center">
        <p className="font-sans text-lg flex justify-center items-center text-blue-600 p-4 font-normal">
          Let's calculate <b>&nbsp;distance&nbsp;</b> from Google maps
        </p>
        <div className="flex flex-col-reverse md:flex-row w-full bg-gray-100 font-sans px-4">
          <AddVenues
            origin={origin}
            destination={destination}
            setOrigin={setOrigin}
            setDestination={setDestination}
            setResponse={setResponse}
            stops={stops}
            setStops={setStops}
            directionsCallback={directionsCallback}
            mode={mode}
            setMode={setMode}
          />

          <Maps
            response={response}
            origin={origin}
            destination={destination}
            stops={stops}
            directionsCallback={directionsCallback}
            mode={mode}
          />
        </div>
      </div>
    </LoadScript>
  );
};

export default App;
