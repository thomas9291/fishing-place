import multer from "multer";
import { handleUpload } from "../../../../helper";

import Place from "db/models/places";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single("sample_file");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
const handler = async (req, res) => {
  console.log("request body:", req.body);
  try {
    await runMiddleware(req, res, myUploadMiddleware);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
    console.log("cloud response", cldRes);
    if (cldRes) {
      const placeToUpdate = await Place.updateOne(
        { _id: _id },
        { $addToSet: { images: cldRes.url } }
      );

      console.log("placeToUpdate:", placeToUpdate);
      return res.status(200).json(placeToUpdate);
    }
    console.log("cloud response", cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};
export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
