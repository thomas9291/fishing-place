/* import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function AddFotos() {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [file, setFile] = useState(null);
  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    console.log(file);
    data.set("sample_file", file);
    try {
      const res = await axios.post("/api/upload/upload", data);
      setRes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <label htmlFor="file" className="btn btn-grey">
        {" "}
        select file
      </label>
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
       {file && (
        <div>
          <p className="file_name">{file.name}</p>
          <Image
            src={res.url}
            alt="image from autor"
            width={200}
            height={200}
          />
        </div>
      )}
      <code>
        {Object.keys(res).map(
          (key) =>
            key && (
              <p className="output-item" key={key}>
                <span>{key}:</span>
                <span>
                  {typeof res[key] === "object" ? "object" : res[key]}
                </span>
              </p>
            )
        )}
      </code>
      {file && (
        <>
          <button className="btn-green" onClick={uploadFile}>
            {loading ? "uploading..." : "upload to Cloudinary"}
          </button>
        </>
      )}
    </div>
  );
}
 */
