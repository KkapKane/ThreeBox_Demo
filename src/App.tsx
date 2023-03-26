
import "./style.scss";
import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import Test from "./Test";
import {useRef , useCallback, useEffect, useState} from 'react'
import React from "react";


function App() {
  const mapRef = useRef<any>(null);

  const MAPBOX_ACCESS_TOKEN: string =
    "pk.eyJ1Ijoia2thcGthbmUiLCJhIjoiY2xlcWhnempoMGlvNjNxbnE0YW1uMnk3eSJ9.QAV9riOpCHAsq4esfkqdDw";
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
    let stats;
    let items = 5;
    let minZoom = 16;
    let maxZoom = 18;
    let zoomStep = (maxZoom - minZoom) / 5;
    let toggleableLayerIds: any = [];
    if (!mapRef.current) return;
    var map = mapRef.current.getMap();

    map.on("click", (e: any) => {
      var coordinates = e.lngLat;
      console.log(coordinates);
    });

    window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
      defaultLights: true,
      enableSelectingObjects: true,
      enableTooltips: true,
      multiLayer: true, // this will create a default custom layer that will manage a single tb.update
    });

    for (let j = 1; j <= items; j++) {
      let l = {
        layer: "3d-model" + j,
        origin: [-96.89169896977438, 38.32003804321502 + j * 2],
      };
      toggleableLayerIds.push(l);
    }

     let i = 0;
     toggleableLayerIds.forEach((l: any) => {
       i++;
       map.addLayer(createCustomLayer(l.layer, l.origin), "waterway-label");
      
       
     });


      function createCustomLayer(layerId: any, origin: any) {
        //create the layer
        let customLayer3D = {
          id: layerId,
          type: "custom",
          renderingMode: "3d",
          onAdd: function (map: any, gl: any) {
            addModel(layerId, origin);
          },
          render: function (gl: any, matrix: any) {
            window.tb.update();
            //tb.update(); is not needed anymore if multiLayer : true
          },
        };
        return customLayer3D;
      }

      function addModel(layerId: any, origin: any) {
        console.log(toggleableLayerIds)
        let options = {
          obj: "centeredTree.glb", //model url
          type: "glb",
          units: "meters", //units in the default values are always in meters
          scale: 10000,
          rotation: { x: 90, y: 0, z: 0 }, //default rotation
          anchor: "center",
        };
        window.tb.loadObj(options, function (model: any) {
          model.setCoords(origin);
          let l = map.getLayer(layerId);
          console.log(model)
          window.tb.add(model, layerId);
        });
      }

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
