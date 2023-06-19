import React, { useRef, useState } from "react";
import Link from "next/link";

import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 52,
    longitude: 13,

    zoom: 10,
  });
  return (
    <>
      <div /* className=" position-relative" */>
        hello
        <ReactMapGL
          {...viewport}
          width="500px"
          height="500px"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        ></ReactMapGL>
      </div>
    </>
  );
}
