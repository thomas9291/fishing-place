import React, { useRef, useState } from "react";
/* import Link from "next/link"; */
import Map, { Marker, Popup, ViewState, InteractiveMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "./location_on_FILL1_wght400_GRAD0_opsz48.svg";

export default function MyMap({ locations, marker, /* setMarker, */ onClick }) {
  /*  const [showPopup, setShowPopup] = useState(true); */

  const mapRef = useRef(null);
  console.log("mapref", mapRef);
  const [viewport, setViewport] = useState({
    latitude: 52.531677,
    longitude: 13.381777,
    zoom: 10,
  });

  return (
    <div className=" position-relative ">
      <Map
        initialViewState={{ ...viewport }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={-2}
        maxZoom={15}
        style={{ width: "100vw", height: "50vh" }}
        onClick={onClick}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {locations &&
          locations.map(({ latitude, longitude, _id }) => (
            <Marker
              key={_id}
              onClick={() => console.log("idmarker:", _id)}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
              /*  defaultValue={defaultData} */
            >
              <Image src={pin} alt="marker" width={20} height={20} />
            </Marker>
          ))}{" "}
        {marker && <Marker {...marker} />}
      </Map>
    </div>
  );
}
