import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  coordinates: [
    {
      longitude: { type: Number, required: false },
      latitude: { type: Number, required: false },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
