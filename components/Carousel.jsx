import { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const array = [
    "/img/img1.jpg",
    "/img/img2.jpg",
    "/img/img3.jpg",
    "/img/img4.jpg",
    "/img/img5.jpg",
    "/img/img6.jpg",
    "/img/img7.jpg",
    "/img/img8.jpg",
    "/img/img9.jpg",
    "/img/img10.jpg",
    "/img/img11.jpg",
    "/img/img12.jpg",
    "/img/img13.jpg",
    "/img/img14.jpg",
    "/img/img15.jpg",
    "/img/img16.jpg",
  ];

  function loop(count) {
    if (count == array.length) {
      return (count = 0);
    }
    if (count < 0) {
      return (count = array.length - 1);
    }
    return count;
  }

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((count) => loop(count + 1)),
      5000
    );
    return () => clearInterval(interval);
  });

  return (
    <div className="main">
      <button
        className="prevBtn btn"
        onClick={() => setIndex((count) => loop(count - 1))}
      >
        &#8678;
      </button>
      <button
        className="nextBtn btn"
        onClick={() => setIndex((count) => loop(count + 1))}
      >
        &#8680;
      </button>
      <div className="container">
        <Image
          src={array[index]}
          layout="fill"
          objectFit="contain"
          alt="errorImg"
        />
      </div>
    </div>
  );
};

export default Carousel;
