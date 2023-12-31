import { Inter } from "next/font/google";
/* import styles from "@/styles/Home.module.css"; */
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import InitialInfo from "@/component/InitialInfo/InitialInfo";

import NavBar from "../component/NavBar/NavBar";
import CartDetail from "../component/CartDetail/CartDetail";
import MyMap from "../component/MyMap/MyMap";
//map geolocalisation
import { useRef, useEffect, useState } from "react";
import { GeolocateControl } from "react-map-gl";
//map geolocalisation

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const { data: session } = useSession();
  const [info, setInfo] = useState(false);
  const toggleInfo = () => {
    setInfo(!info);
  };
  //map geolocalisation component
  const geoControlRef = useRef();
  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
  }, []);
  //map geolocalisation component

  const { data: placesList } = useSWR("/api/places", { fallbackData: [] });
  const { data: user, isLoading } = useSWR("/api/user", { fallbackData: [] });

  if (isLoading) return <div className="z-index-3 ">loading...</div>;
  if (session) {
    return (
      <>
        <NavBar onClick={() => signOut()} onClickInfo={toggleInfo} />
        <div className="d-flex flex-column align-items-center ">
          <div>
            <MyMap locations={placesList} coordinates={user[0]?.coordinates}>
              <GeolocateControl ref={geoControlRef} />
            </MyMap>
          </div>
          <button className="btnInfo" onClick={toggleInfo}>
            {info ? "back" : "info"}
          </button>

          {info && <InitialInfo onClick={toggleInfo} />}
          <div
            style={{ width: "100%" }}
            className="border border-3 border-white"
          >
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
              {placesList.map(
                ({
                  name,
                  address,
                  images,
                  latitude,
                  longitude,
                  favorite,
                  description,
                  grill,
                  beach,
                  camping,
                  shore,
                  boat,
                  _id,
                }) => {
                  return (
                    <SwiperSlide key={_id} style={{ width: "75%" }}>
                      <Link href={`/places/${_id}`}>
                        <CartDetail
                          name={name}
                          images={images[0]}
                          address={address}
                          latitude={latitude}
                          longitude={longitude}
                          favorite={favorite}
                          description={description}
                          grill={grill}
                          beach={beach}
                          camping={camping}
                          shore={shore}
                          boat={boat}
                        />
                      </Link>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
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
        <h1 className="text-center">Fishing Place</h1>

        <h4 className="text-center"> Not signed in </h4>
        <p className="text-center">
          to have access to your account, first sign in!
        </p>

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
