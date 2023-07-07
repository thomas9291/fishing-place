import React from "react";
import classe from "./InitialInfo.module.css";

export default function InitialInfo({ onClick }) {
  return (
    <div className={classe.infoContainer}>
      <h2>Welcome to fishing place!</h2>
      <h3 className={classe.h3}>short introduction to use the website:</h3>
      <ul>
        <li>
          in the navigation bar, enter the name of a city to activate the map in
          your city.
        </li>
        <li>
          to add a new place on the map, in the navigation bar click on the Add
          place link.
        </li>
        <li>click on the map to add a marker and fill out the form.</li>
        <li>click submit , you have created your first place!</li>
        <li>
          by clicking on the card or on the marker of the map you have access to
          the information of the card as well as its location on the map.
        </li>
        <li>
          by clicking on Add foto you can add your photos in the desired cart.
        </li>
        <li>
          in the navigation bar you can filter your favorite places using the
          dropdown.
        </li>
      </ul>
      <button className="btn btn-info" type="button" onClick={onClick}>
        ❌
      </button>
    </div>
  );
}
