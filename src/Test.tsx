import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";



const Test = () => {



mapboxgl.accessToken =
  "pk.eyJ1Ijoia2thcGthbmUiLCJhIjoiY2xlcWhrOHpnMDRnZjNycTZkYTc3anMxMiJ9.CAQOno2NIvAsyP5EgfySDA";
  

  const mapRef = useRef(null)


  let soldier, tb;
  const origin: [number, number] = [-122.47920912, 37.716351775];
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/light-v11",
      
      center: origin,
      zoom: 18,
      pitch: 60,
      bearing: 0,
    });

    map.on("style.load", function () {
      map.addLayer({
        id: "custom_layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map, mbxContext) {
          window.tb = new Threebox(map, mbxContext, { defaultLights: true });

          const options = {
            obj: "/woman.gltf",
            type: "gltf",
            scale: 90,
            units: "meters",
            rotation: { x: 90, y: 0, z: 0 }, //default rotation
          };

          window.tb.loadObj(options, function (model: any) {
            soldier = model.setCoords(origin);
            window.tb.add(soldier);
          });

     

        },


        render: function (gl, matrix) {
          window.tb.update();
        },
      });
    });
    return () => {
      map.remove();
    };
  }, []);
  return (
    <div id='map-container' style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default Test;
