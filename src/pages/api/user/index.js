import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/user";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const id = session?.user?._id;
  if (request.method === "GET") {
    //filter the place where the user is login
    const user = await User.find({ _id: id });
    console.log("user fom api:", user, id);
    return response.status(200).json(user);
  }
  if (request.method === "POST") {
    console.log("coordinate post request:", request.body);
    try {
      if (id) {
        await User.findByIdAndUpdate(id, {
          coordinates: request.body.coordinates,
        });

        return response.status(201).json({ status: "User created" });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
