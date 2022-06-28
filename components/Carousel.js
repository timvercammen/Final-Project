import { useState, useEffect } from "react";
import Image from "next/image";
import TbArrowsRandom from "react-icons/tb";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const getImages = () => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setImages(data[randomNum]);
      });
  };

  function loop(count) {
    if (count === getImages.length + 1) {
      return count;
    }
    if (count < 0) {
      return count === getImages.length - 1;
    }
    return count;
  }

  useEffect(() => {
    getImages();
    const interval = setInterval(
      () => setIndex((count) => loop(count + 1)),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      <div className="main__container">
        <img
          className="main__container__img"
          onClick={getImages}
          src={images.img_url}
          alt="errorImg"
        />
      </div>
    </div>
  );
};

export default Carousel;
