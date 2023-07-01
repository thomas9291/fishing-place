import { Inter } from "next/font/google";
/* import styles from "@/styles/Home.module.css"; */
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";

import NavBar from "../component/NavBar/NavBar";
import CartDetail from "../component/CartDetail/CartDetail";
import MyMap from "../component/MyMap/MyMap";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const { data: session } = useSession();

  const { data: placesList } = useSWR("/api/places", { fallbackData: [] });
  if (session) {
    return (
      <>
        <NavBar onClick={() => signOut()} />
        <div className="d-flex flex-column align-items-center ">
          <div>
            <MyMap locations={placesList} />
          </div>
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
