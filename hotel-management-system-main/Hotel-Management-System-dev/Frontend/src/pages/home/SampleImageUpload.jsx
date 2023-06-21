import { useState } from "react";
import storage from "../../utils/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SampleImageUpload = () => {
  const [image, setImage] = useState("");

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  // Firebase Image Upload
  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file to upload!");
    }

    const storageRef = ref(storage, `/images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update upload progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
        });
      }
    );
  };
  return (
    <div>
      <h1>Sample Image Upload</h1>

      <label htmlFor="file">Choose Image</label>
      <input
        type="file"
        id="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      {percent > 0 && <progress value={percent} max="100" />}
      {image && <img src={image} alt="uploaded" />}
    </div>
  );
};

export default SampleImageUpload;
