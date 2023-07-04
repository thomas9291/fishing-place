import React, { useRef, useState } from "react";
import Link from "next/link";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "./location_on_FILL1_wght400_GRAD0_opsz48.svg";

export default function MyMap({ locations, marker, onClick, coordinates }) {
  const mapRef = useRef(null);
  /*  const initialLatitude = coordinates ? coordinates.latitude : 52.531677;
  const initialLongitude = coordinates ? coordinates.longitude : 13.381777; */

  const [viewport, setViewport] = useState({
    latitude: coordinates ? coordinates[0]?.latitude : 52.531677,
    longitude: coordinates ? coordinates[0]?.longitude : 13.381777,
    zoom: 10,
  });
  console.log("initial value latitude:", viewport);
  /*  console.log("initial value longitude:", initialLongitude); */

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
        mapStyle="mapbox://styles/thomas9291/cljn9e70f00eg01o4edit1358"
      >
        <GeolocateControl />
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
