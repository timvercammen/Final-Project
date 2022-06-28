import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MdUpload } from "react-icons/md";
import { Image } from "cloudinary-react";
// import styles from "../styles/Drop.module.scss";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";

export default function Drop(id) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const { signature, timestamp } = await getSignature();

      const formData = new FormData();
      formData.append("file", acceptedFile);

      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      const dataImg = await response.json();
      const image = {
        img_name: dataImg.original_filename,
        img_url: dataImg.url,
        img_trav_id: id.id,
      };
      const data = await axios.post("/api/photos", image);

      setUploadedFiles((old) => [...old, dataImg]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: true,
  });

  // return (
  //   <div id="dropZone">
  //     <div
  //       {...getRootProps()}
  //       className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
  //     >
  //       <input {...getInputProps()} />
  //       Drop Zone
  //     </div>
  //     <Row className="dropRow">
  //       <ul className={`${styles.itemList}`}>
  //         {uploadedFiles.map((file) => (
  //           <Col xs={3}>
  //             <li className={`${styles.item}`} key={file.public_id}>
  //               <Image
  //                 cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
  //                 publicId={file.public_id}
  //                 width="100"
  //                 crop="scale"
  //               />
  //             </li>
  //           </Col>
  //         ))}
  //       </ul>
  //       <ul className={`${styles.itemList}`}>
  //         {uploadedFiles.map((file) => (
  //           <li className={`${styles.item}`} key={file.public_id}></li>
  //         ))}
  //       </ul>
  //     </Row>
  //   </div>
  // );
  return (
    <Container id="dropZone">
      <Row className="d-flex">
        <Col
          {...getRootProps()}
          className="dropArea d-flex justify-content-center align-items-center"
        >
          <div>
            <input {...getInputProps()} />
            <MdUpload />
            <p>Drop Zone</p>
          </div>
        </Col>
      </Row>
      <Row className="dropListRow">
        {uploadedFiles.map((file) => (
          <Col xs={6} key={file.public_id}>
            <Image
              className="w-100 m-2"
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={file.public_id}
            />
          </Col>
        ))}
        <ul>
          {uploadedFiles.map((file) => (
            <li className="" key={file.public_id}></li>
          ))}
        </ul>
      </Row>
    </Container>
  );
}

async function getSignature() {
  const response = await fetch("/api/sign");
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}
