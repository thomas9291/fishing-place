import React, { useRef, useState } from "react";
import Link from "next/link";
import Map, { Marker, Popup, ViewState, InteractiveMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "./location_on_FILL1_wght400_GRAD0_opsz48.svg";

export default function MyMap({ locations, marker, /* setMarker, */ onClick }) {
  /*  const [showPopup, setShowPopup] = useState(true); */

  const mapRef = useRef(null);

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
        mapStyle="mapbox://styles/thomas9291/cljh3lnll00e401pi8m769f8e"
      >
        {locations &&
          locations.map(({ latitude, longitude, _id }) => (
            <Marker
              key={_id}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
            >
              <Link href={`/places/${_id}`}>
                <Image src={pin} alt="marker" width={30} height={30} />
              </Link>
            </Marker>
          ))}{" "}
        {marker && <Marker {...marker} />}
      </Map>
    </div>
  );
}
