import hero1 from "@/public/hero/hero1.png"
import hero2 from "@/public/hero/hero2.jpg"
import hero3 from "@/public/hero/hero3.jpg"
import hero4 from "@/public/hero/hero4.jpg"
import ImageSlider from "./ImageSlider"

const IMAGES = [
    { url: hero1, alt: "Hero 1" },
    { url: hero2, alt: "Hero 2" },
    { url: hero3, alt: "Hero 3" },
    { url: hero4, alt: "Hero 4" }
]

const Hero = () => {
  return (
    <div style={{ width: "100%", aspectRatio: "10 / 6", margin: "0 auto"}} >
      <ImageSlider images={IMAGES}/>
    </div>
  )
}

export default Hero
