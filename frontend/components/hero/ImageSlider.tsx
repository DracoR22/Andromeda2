'use client'

import Image, { StaticImageData } from "next/image"
import { useState, useEffect } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { TbCircleDot } from "react-icons/tb"
import { BsCircle } from "react-icons/bs"

interface Props {
    images: {
        url: StaticImageData
        alt: string
      }[]
}

const ImageSlider = ({ images }: Props) => {

    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        // Function to show the next image
        const showNextImage = () => {
          setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
        };
    
        // Set an interval to show the next image every N milliseconds (adjust the interval as needed)
        const intervalId = setInterval(showNextImage, 3000); // Change slide every 5 seconds
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, [images]);

    function showNextImage() {
      setImageIndex(index => {
        if (index === images.length - 1) return 0
        return index + 1
      })
    }
  
    function showPrevImage() {
      setImageIndex(index => {
        if (index === 0) return images.length - 1
        return index - 1
      })
    }

  return (
    <section
    aria-label="Image Slider"
    style={{ width: "100%", height: "100%", position: "relative" }}
  >
    <a href="#after-image-slider-controls" className="skip-link">
      Skip Image Slider Controls
    </a>
    <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden",}}>
      {images.map(({ url, alt }, index) => (
        <Image src={url} alt={alt} height={2000} width={2000} aria-hidden={imageIndex !== index} className="img-slider-img"
         style={{ translate: `${-100 * imageIndex}%` }} key={index}/>
      ))}
    </div>
    <button
      onClick={showPrevImage}
      className="img-slider-btn"
      style={{ left: 0 }}
      aria-label="View Previous Image"
    >
      <AiOutlineArrowLeft aria-hidden />
    </button>
    <button
      onClick={showNextImage}
      className="img-slider-btn"
      style={{ right: 0 }}
      aria-label="View Next Image"
    >
      <AiOutlineArrowRight aria-hidden />
    </button>
    <div
      style={{
        position: "absolute",
        bottom: ".5rem",
        left: "50%",
        translate: "-50%",
        display: "flex",
        gap: ".25rem",
      }}
    >
      {images.map((_, index) => (
        <button
          key={index}
          className="img-slider-dot-btn"
          aria-label={`View Image ${index + 1}`}
          onClick={() => setImageIndex(index)}
        >
          {index === imageIndex ? (
            <TbCircleDot aria-hidden />
          ) : (
            <BsCircle aria-hidden />
          )}
        </button>
      ))}
    </div>
    <div id="after-image-slider-controls" />
  </section>
  )
}

export default ImageSlider
