import React from "react";

import classes from "./AddForm.module.css";

export default function AddForm({ onSubmit, defaultData, marker }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("formDta", formData);
    const data = Object.fromEntries(formData);
    data.latitude = marker.latitude;
    data.longitude = marker.longitude;
    console.log("dataForm", data);
    onSubmit(data);
  }
  console.log("markerForm:", marker);

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
            name="address"
            id="address"
            defaultValue={defaultData?.address}
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
            <label htmlFor="beach">beach:</label>
            <input
              className={classes.checkboxInput}
              type="checkbox"
              id="beach"
              name="beach"
              defaultValue={defaultData?.beach}
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
