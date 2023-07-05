import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";

import NavBar from "../component/NavBar/NavBar";
import AddForm from "@/component/AddForm/AddForm";
import MyMap from "@/component/MyMap/MyMap";

export default function Create() {
  const router = useRouter();
  const [marker, setMarker] = useState();

  const { push } = router;
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
  const { data: user, isLoading } = useSWR("/api/user", { fallbackData: [] });

  if (isLoading) return <div className="z-index-3 ">loading...</div>;
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
              coordinates={user[0]?.coordinates}
            />
          </div>
        </div>

        <div>
          {" "}
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
