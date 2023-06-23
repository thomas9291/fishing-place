import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import NavBar from "../../component/NavBar/NavBar";
import AddForm from "../../component/AddForm/AddForm";
import MyMap from "component/MyMap/MyMap";

export default function Create() {
  const router = useRouter();
  const [marker, setMarker] = useState();
  console.log("marker:", marker);
  const { push } = router;
  /* const places = useSWR("pages/api/places/index.js"); */
  const { data: session } = useSession();
  async function addPlace(place) {
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(place),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      push("/");
    } else {
      console.error(response.status);
    }
  }
  const handleClick = ({ lngLat: { lat, lng } }) => {
    setMarker({ longitude: lng, latitude: lat });
  };
  if (session) {
    return (
      <>
        <NavBar />
        <div>
          <div style={{ height: "50vh" }}>
            <MyMap
              marker={marker}
              onClick={handleClick}
              setMarker={setMarker}
            />
          </div>
        </div>
        <div>
          <AddForm onSubmit={addPlace} marker={marker} />
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="d-flex flex-column card mx-auto mt-5 p-2"
        style={{ width: "30%" }}
      >
        <h4 className="text-center"> Not signed in </h4>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </>
  );
}
