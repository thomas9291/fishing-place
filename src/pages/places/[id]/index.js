import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import NavBar from "@/component/NavBar/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

import CartDetail from "@/component/CartDetail/CartDetail";
import MyMap from "@/component/MyMap/MyMap";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

export default function DetailsPage() {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const { data: session } = useSession();
  const [fotoForm, setFotoForm] = useState(false);

  const handelFotoForm = () => {
    setFotoForm(!fotoForm);
  };

  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading || error)
    return <h2 className="text-light-emphasis">Loading...</h2>;
  async function deletePlace() {
    await fetch(`/api/places/${id}`, {
      method: "DELETE",
    });
    push("/");
  }

  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.set("sample_file", file);
    try {
      const res = await axios.post(`/api/upload/upload?id=${id}`, data);

      setRes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <>
        <NavBar onClick={() => signOut()} />
        <div className="d-flex flex-column align-items-center ">
          <div style={{ height: "50vh" }}>
            <MyMap locations={[place]} />
          </div>
          <div
            style={{ backgroundColor: "white", width: "100%" }}
            className="d-flex flex-column align-items-center "
          >
            <div>
              <button
                type="button"
                className="btn btn-danger text-center m-1"
                onClick={() => deletePlace()}
              >
                Delete
              </button>
              <button type="button" className="btn btn-primary text-center m-1">
                <Link href={`/places/${id}/edit`}>Edit</Link>
              </button>
              <button
                type="button"
                onClick={handelFotoForm}
                className="btn btn-success text-center m-1"
              >
                {fotoForm ? "back" : "add fotos"}
              </button>
            </div>
            {fotoForm && (
              <div className="App">
                <label htmlFor="file" className="btn btn-grey">
                  {" "}
                  select file
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={handleSelectFile}
                  multiple={false}
                />{" "}
              </div>
            )}

            {file && (
              <>
                <button className="btn btn-success" onClick={uploadFile}>
                  {loading ? "uploading..." : " upload "}
                </button>
              </>
            )}

            <div className="border border-3 border-white">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                {place.images.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        src={image}
                        alt="image from autor"
                        width={200}
                        height={200}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <div>
              <CartDetail
                name={place.name}
                images={place.images[0]}
                address={place.address}
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
