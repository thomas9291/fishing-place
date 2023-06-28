import React from "react";

import classes from "./CartDetail.module.css";

export default function CartDetail({
  name,

  address,
  favorite,
  description,
  grill,
  beach,
  camping,
  shore,
  boat,
  _id,
}) {
  return (
    <>
      <div className={classes.containerCard}>
        <h5 className={classes.cardTitle}>{name}</h5>

        <div className={classes.cardBody}>
          <p className={classes.cardText}>{address}</p>
          <p className={classes.cardText}>description: {description}</p>
        </div>
        <div className={classes.listGroup}>
          <span className={classes.listGroupItem}>favorite: {favorite}</span>
          <span className={classes.listGroupItem}>grill: {grill}</span>

          <span className={classes.listGroupItem}>beach: {beach}</span>
          <span className={classes.listGroupItem}>camping: {camping}</span>

          <span className={classes.listGroupItem}>shore: {shore}</span>
          <span className={classes.listGroupItem}>boat: {boat}</span>
        </div>
      </div>
    </>
  );
}
