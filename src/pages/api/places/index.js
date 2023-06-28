import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/places";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    console.log("places2", places);
    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
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

      const place = new Place(placeData);
      await place.save();
      return response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
