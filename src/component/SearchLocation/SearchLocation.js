import React from "react";
import { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";

export default function SearchLocation() {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  async function searchHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.searchCity}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;
    console.log("data from input search", data.searchCity);
    const coorResponse = await fetch(mapUrl);
    const coorData = await coorResponse.json();
    const coordinates = coorData?.features[0]?.center;

    console.log("coordinates: ", coordinates);
    event.target.reset();
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        coordinates: [{ longitude: coordinates[0], latitude: coordinates[1] }],
        user: session.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(`There was an error: ${response.status}`);
    } else {
      mutate();
    }
  }

  return (
    <form onSubmit={searchHandler} className="searchInput">
      <input
        type="text"
        id="searchCity"
        name="searchCity"
        placeholder="enter a city"
      />
      <button className="btn btn-success m-1 p-1" type="submit">
        send
      </button>
    </form>
  );
}
