import { useRouter } from "next/router";
import useSWR from "swr";
import AddForm from "@/component/AddForm/AddForm";
import NavBar from "@/component/NavBar/NavBar";
import MyMap from "@/component/MyMap/MyMap";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function EditPage() {
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const [marker, setMarker] = useState();
  const { data: session } = useSession();

  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    const response = await fetch(`/api/places/${id}`, {
      method: "PUT",
      body: JSON.stringify(place),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
      push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  if (!isReady || isLoading || error)
    return <h2 className="text-light-emphasis">Loading...</h2>;
  const handleClick = ({ lngLat: { lat, lng } }) => {
    setMarker({ longitude: lng, latitude: lat });
  };
  if (session) {
    return (
      <>
        <NavBar />
        <h2 id="edit-place">Edit Place</h2>
        <div>
          <div style={{ height: "50vh" }}>
            <MyMap locations={[place]} marker={marker} onClick={handleClick} />
          </div>
        </div>
        <div>
          <AddForm onSubmit={editPlace} marker={marker} defaultData={place} />
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
