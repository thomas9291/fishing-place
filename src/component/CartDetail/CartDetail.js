import React from "react";

import classes from "./CartDetail.module.css";
import Image from "next/image";

export default function CartDetail({
  name,
  images,
  address,
  favorite,
  description,
  grill,
  beach,
  camping,
  shore,
  boat,
}) {
  return (
    <>
      <div className={classes.containerCard}>
        <h5 className={classes.cardTitle}>{name}</h5>
        <div style={{ width: "90%", margin: "0.5rem" }}>
          <Image
            style={{ objectFit: "fill" }}
            src={images}
            width={200}
            height={200}
            alt="Waiting for foto"
          />
        </div>

        <div className={classes.cardBody}>
          <p>{address}</p>
        </div>
        <div className={classes.cardBody}>
          <p>description: {description}</p>
        </div>
      </div>

      <div className={classes.listGroup}>
        <span className={classes.listGroupItem}>favorite: {favorite}</span>
        <span className={classes.listGroupItem}>grill: {grill}</span>

        <span className={classes.listGroupItem}>beach: {beach}</span>
        <span className={classes.listGroupItem}>camping: {camping}</span>

        <span className={classes.listGroupItem}>shore: {shore}</span>
        <span className={classes.listGroupItem}>boat: {boat}</span>
      </div>
    </>
  );
}
