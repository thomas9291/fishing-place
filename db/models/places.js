import mongoose from "mongoose";
const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String, required: false },
  favorite: { type: String, required: false },
  grill: { type: String, required: false },
  beach: { type: String, required: false },
  camping: { type: String, required: false },
  shore: { type: String, required: false },
  boat: { type: String, required: false },
  /* images: { type: [Schema.Types.ObjectId], ref: "Image" }, */
});
const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
