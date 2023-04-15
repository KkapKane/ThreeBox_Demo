import "./style.scss";
import { Map } from "react-map-gl";
import { useRef, useCallback, useEffect, useState } from "react";

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
    noOverLay: "mapbox://styles/kkapkane/clfor1iwa003401o2ynppt204",
  };

  const origin: [number, number] = [-96.89169896977438, 38.32003804321502];

  const onMapLoad = useCallback(() => {
    const countryLocationArray = [
      { name: "USA", coord: [-96.89169896977438, 38.32003804321502] },
      { name: "CHINA", coord: [104.195397, 35.86166] },
      { name: "JAPAN", coord: [138.252924, 36.204824] },
      { name: "GERMANY", coord: [10.451526, 51.165691] },
      { name: "UNITED KINGDOM", coord: [-3.435973, 55.378051] },
      { name: "INDIA", coord: [78.96288, 20.593684] },
      { name: "FRANCE", coord: [2.213749, 46.227638] },
      { name: "ITALY", coord: [12.56738, 41.87194] },
      { name: "BRAZIL", coord: [-51.92528, -14.235004] },
      { name: "CANADA", coord: [-106.346771, 56.130366] },
      { name: "SOUTH KOREA", coord: [127.766922, 35.907757] },
      { name: "RUSSIA", coord: [105.318756, 61.52401] },
      { name: "AUSTRALIA", coord: [133.775136, -25.274398] },
      { name: "MEXICO", coord: [-102.552784, 23.634501] },
      { name: "INDONESIA", coord: [113.921327, -0.789275] },
      { name: "TURKEY", coord: [35.243322, 38.963745] },
      { name: "SAUDI ARABIA", coord: [45.079162, 23.885942] },
      { name: "SWITZERLAND", coord: [8.227512, 46.818188] },
      { name: "ARGENTINA", coord: [-63.616672, -38.416097] },
      { name: "TAIWAN", coord: [120.960515, 23.69781] },
      { name: "POLAND", coord: [19.145136, 51.919438] },
      { name: "THAILAND", coord: [100.992541, 15.870032] },
      { name: "SOUTH AFRICA", coord: [22.937506, -30.559482] },
      { name: "NETHERLANDS", coord: [5.291266, 52.132633] },
      { name: "SWEDEN", coord: [18.643501, 60.128161] },
    ];
    let items = countryLocationArray.length;
    let toggleableLayerIds: any = [];
    if (!mapRef.current) return;
    var map = mapRef.current.getMap();
    //@ts-expect-error
    window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
      defaultLights: true,
      enableSelectingObjects: true,
      enableDraggingObjects: true,
      enableSelectingFeatures: true,
      enableTooltips: true,
      multiLayer: true, // this will create a default custom layer that will manage a single tb.update
    });

    // map.scrollZoom.disable()
    map.boxZoom.disable();
    map.dragRotate.disable();

    function animate() {
      requestAnimationFrame(animate);
    }

    animate();

    map.setLayoutProperty("country-label", "visibility", "none");
    map.setLayoutProperty("continent-label", "visibility", "none");
    map.setLayoutProperty("road-label-simple", "visibility", "none");
    map.setLayoutProperty("state-label", "visibility", "none");
    map.setLayoutProperty("airport-label", "visibility", "none");
    map.setLayoutProperty("poi-label", "visibility", "none");
    map.setLayoutProperty("water-point-label", "visibility", "none");
    map.setLayoutProperty("water-line-label", "visibility", "none");
    map.setLayoutProperty("natural-point-label", "visibility", "none");
    map.setLayoutProperty("settlement-major-label", "visibility", "none");
    map.setLayoutProperty("settlement-minor-label", "visibility", "none");

    for (let j = 0; j <= items - 1; j++) {
      let l = {
        layer: countryLocationArray[j].name,
        origin: countryLocationArray[j].coord,
      };
      toggleableLayerIds.push(l);
    }

    let i = 0;
    toggleableLayerIds.forEach((l: any) => {
      i++;
      map.addLayer(createCustomLayer(l.layer, l.origin));
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
        },
      };
      return customLayer3D;
    }

    function addModel(layerId: any, origin: any) {
      let options = {
        obj: "centeredTree.glb", //model url
        type: "glb",
        units: "meters", //units in the default values are always in meters
        scale: 40000,
        rotation: { x: 90, y: 180, z: 0 }, //default rotation
        anchor: "center",
      };
      window.tb.loadObj(options, function (model: any) {
        const tree = model.setCoords(origin);

        let l = map.getLayer(layerId);

        window.tb.add(model, layerId);
      });
    }
  }, []);

  return (
    <Map
      antialias={true}
      hash={true}
      ref={mapRef}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={Styles.Light}
      onLoad={onMapLoad}
    />
  );
}

export default App;
