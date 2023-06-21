import { Inter } from "next/font/google";
/* import styles from "@/styles/Home.module.css"; */
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";

import NavBar from "../../component/NavBar/NavBar";
import CartDetail from "component/CartDetail/CartDetail";
import MyMap from "../../component/MyMap/MyMap";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const { data: session } = useSession();
  const { data: placesList } = useSWR("/api/places", { fallbackData: [] });
  console.log("placesList:", placesList);

  console.log(session);
  if (session) {
    return (
      <>
        <NavBar onClick={() => signOut()} />
        <div className="d-flex flex-column align-items-center ">
          <div>
            <MyMap />
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
                  latitude,
                  longitude,
                  favorite,
                  description,
                  grill,
                  beatch,
                  camping,
                  shore,
                  boat,
                  _id,
                }) => {
                  return (
                    <SwiperSlide key={_id}>
                      <CartDetail
                        name={name}
                        image={
                          "https://images.unsplash.com/photo-1618570395080-674aff5b5046?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFjfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                        }
                        address={address}
                        latitude={latitude}
                        longitude={longitude}
                        favorite={favorite}
                        description={description}
                        grill={grill}
                        beatch={beatch}
                        camping={camping}
                        shore={shore}
                        boat={boat}
                      />
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
