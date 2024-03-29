import hero1 from "@/public/hero/heros1.webp"
import hero2 from "@/public/hero/heros2.webp"
import hero3 from "@/public/hero/adidas.webp"
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
    <div className="flex justify-center" >
      <ImageSlider images={IMAGES}/>
    </div>
  )
}

export default Hero
