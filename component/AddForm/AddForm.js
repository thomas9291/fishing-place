import React, { useState } from "react";

import classes from "./AddForm.module.css";

export default function AddForm({ onSubmit, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log("formDta", formData);
    const data = Object.fromEntries(formData);
    console.log("dataForm", data);
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.addForm}>
      <h1 className={classes.header}>Create Place</h1>
      <div className={classes.containerForm}>
        <div className={classes.inputDiv}>
          <label htmlFor="name">Name:</label>
          <input
            className={classes.input}
            type="text"
            id="name"
            name="name"
            defaultValue={defaultData?.name}
            required
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="address">address:</label>
          <input
            className={classes.input}
            type="text"
            id="address"
            name="address"
            defaultValue={defaultData?.address}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="latitude:">latitude:</label>
          <input
            className={classes.input}
            type="text"
            id="latitude"
            name="latitude"
            defaultValue={defaultData?.latitude}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="longitude:">longitude:</label>
          <input
            className={classes.input}
            type="text"
            id="longitude"
            name="longitude"
            defaultValue={defaultData?.longitude}
          />
        </div>

        <div>
          <label htmlFor="description">description:</label>
          <textarea
            className={classes.textarea}
            name="description"
            id="description"
            cols="30"
            rows="10"
            defaultValue={defaultData?.description}
          ></textarea>
        </div>
        <div className={classes.containerCheckbox}>
          <div className={classes.checkbox}>
            <label htmlFor="favorite">Favorite:</label>
            <input
              className={classes.checkboxInput}
              type="checkbox"
              id="favorite"
              name="favorite"
              defaultValue={defaultData?.favorite}
              value="true"
            />
          </div>
          <div className={classes.checkbox}>
            <label htmlFor="grill">grill:</label>
            <input
              className={classes.checkboxInput}
              type="checkbox"
              id="grill"
              name="grill"
              defaultValue={defaultData?.grill}
              value="true"
            />
          </div>
          <div className={classes.checkbox}>
            <label htmlFor="beatch">beatch:</label>
            <input
              className={classes.checkboxInput}
              type="checkbox"
              id="beatch"
              name="beatch"
              defaultValue={defaultData?.beatch}
              value="true"
            />
          </div>
          <div className={classes.checkbox}>
            <label htmlFor="camping">camping:</label>
            <input
              className={classes.checkboxInput}
              type="checkbox"
              id="camping"
              name="camping"
              defaultValue={defaultData?.camping}
              value="true"
            />
          </div>
          <div className={classes.checkbox}>
            <label htmlFor="shore">shore:</label>
            <input
              className={classes.checkboxInput}
              type="checkbox"
              name="shore"
              id="shore"
              defaultValue={defaultData?.shore}
              value="true"
            />
          </div>
          <div className={classes.checkbox}>
            <label htmlFor="boat">boat:</label>
            <input
              className={classes.checkboxInput}
              type="checkbox"
              name="boat"
              id="boat"
              defaultValue={defaultData?.boat}
              value="true"
            />
          </div>
        </div>
        <button type="submit" className={classes.btn}>
          Submit
        </button>
      </div>
    </form>
  );
}
