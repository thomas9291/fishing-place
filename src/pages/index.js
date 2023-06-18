import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "../../component/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const { data: session } = useSession();

  console.log(session);

  if (session) {
    return (
      <>
        <NavBar onClick={() => signOut()} />
        {/*  <br />
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
