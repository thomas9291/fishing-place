import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import NavBar from "component/NavBar/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

import CartDetail from "component/CartDetail/CartDetail";
import MyMap from "component/MyMap/MyMap";
import { Marker } from "react-map-gl";

export default function DetailsPage({ marker }) {
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const { data: session } = useSession();

  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);
  if (!isReady || isLoading || error)
    return <h2 className="text-light-emphasis">Loading...</h2>;
  console.log("placeId", place);
  async function deletePlace() {
    await fetch(`/api/places/${id}`, {
      method: "DELETE",
    });
    push("/");
  }

  if (session) {
    return (
      <>
        <NavBar onClick={() => signOut()} />
        <div className="d-flex flex-column align-items-center ">
          <div style={{ height: "50vh" }}>
            <MyMap />
          </div>
          <div
            style={{ backgroundColor: "white", width: "100%" }}
            className="d-flex flex-column align-items-center "
          >
            <div>
              <button
                type="button"
                className="btn btn-danger text-center"
                onClick={() => deletePlace()}
              >
                Delete
              </button>
              <button type="button" className="btn btn-primary text-center">
                <Link href={`/places/${id}/edit`}>Edit</Link>
              </button>
            </div>
            <CartDetail
              name={place.name}
              image={
                "https://images.unsplash.com/photo-1618570395080-674aff5b5046?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFjfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
              }
              address={place.address}
              latitude={place.latitude}
              longitude={place.longitude}
              favorite={place.favorite}
              description={place.description}
              grill={place.grill}
              beach={place.grill}
              camping={place.camping}
              shore={place.shore}
              boat={place.boat}
            />
          </div>
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
