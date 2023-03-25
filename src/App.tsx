
import "./style.scss";
import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import Test from "./Test";
import {useRef , useCallback} from 'react'
import React from "react";


function App() {
  const mapRef = useRef<any>(null);

  const MAPBOX_ACCESS_TOKEN: string =
    "pk.eyJ1Ijoia2thcGthbmUiLCJhIjoiY2xlcWhnempoMGlvNjNxbnE0YW1uMnk3eSJ9.QAV9riOpCHAsq4esfkqdDw";
  let soldier, soldier2, tb;
  const INITIAL_VIEW_STATE = {
    latitude: 37.716359356131875,
    longitude: -122.47919996813236,
    zoom: 3.5,
    bearing: 0,
    pitch: 40,
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

const origin: [number, number] = [-96.89169896977438, 38.32003804321502];

  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    map.on('click', (e: any) => {
      var coordinates = e.lngLat;
      console.log(coordinates)
    })
    
    map.addLayer({
      id: "custom_layer",
      type: "custom",
      center: origin,
      renderingMode: "3d",
      antialias: true,
      onAdd: function (map: any, mbxContext: any) {
        window.tb = new Threebox(map, mbxContext, { defaultLights: true, multiLayer: true });

        const options = {
          obj: "centeredTree.glb",
          type: "glb",
          scale: 100000,
          units: "meters",
          rotation: { x: 90, y: 180, z: 0 }, //default rotation
          anchor: 'center'
        };

        window.tb.loadObj(options, function (model: any) {
          soldier = model.setCoords(origin);

          // window.tb.lights.dirLight.target = model;
          window.tb.add(soldier);

          console.log(model);
        });
      },

      render: function () {
        window.tb.update();
      },
    });
  }, []);



  return (
    <Map
    antialias={true}
      ref={mapRef}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={Styles.Dark}
      onLoad={onMapLoad}
    />
  );
}

export default App;
