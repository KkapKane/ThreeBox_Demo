
import "./style.scss";
import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import Test from "./Test";


function App() {
  const MAPBOX_ACCESS_TOKEN: string =
    "pk.eyJ1Ijoia2thcGthbmUiLCJhIjoiY2xlcWhnempoMGlvNjNxbnE0YW1uMnk3eSJ9.QAV9riOpCHAsq4esfkqdDw";

  const INITIAL_VIEW_STATE = {
    latitude: 37.716351775,
    longitude: -122.47920912,
    zoom: 20,
    bearing: 0,
    pitch: 30,
  };

  const Styles = {
    Street: "mapbox://styles/mapbox/streets-v12",
    OutDoor: "mapbox://styles/mapbox/outdoors-v12",
    Light: "mapbox://styles/mapbox/light-v11",
    Dark: "mapbox://styles/mapbox/dark-v11",
    Satellite: "mapbox://styles/mapbox/satellite-v9",
    StreetSatellite: "mapbox://styles/mapbox/satellite-streets-v12",
    NavigationDay: "mapbox://styles/mapbox/navigation-day-v1",
    NavigationNight: "mapbox://styles/mapbox/navigation-night-v1",
  };



  

  return (
   

    
      <Test/>
   
  );
}

export default App;
