/* import { _id } from "@next-auth/mongodb-adapter"; */
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/place";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const id = session?.user?._id;
  if (request.method === "GET") {
    //filter the place where the user is login
    const places = await Place.find({ user: id });
    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
      console.log("TRYSTARTER");
      //if user ...
      if (id) {
        const placeData = request.body;
        if (placeData.favorite !== "true") {
          placeData.favorite = "false";
        }
        if (placeData.grill !== "true") {
          placeData.grill = "false";
        }
        if (placeData.beach !== "true") {
          placeData.beach = "false";
        }
        if (placeData.camping !== "true") {
          placeData.camping = "false";
        }
        if (placeData.camping !== "true") {
          placeData.camping = "false";
        }
        if (placeData.shore !== "true") {
          placeData.shore = "false";
        }
        if (placeData.boat !== "true") {
          placeData.boat = "false";
        }
        //add the place must have a user field
        placeData.user = id;

        const place = new Place(placeData);
        await place.save();
        return response.status(201).json({ status: "Place created" });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
