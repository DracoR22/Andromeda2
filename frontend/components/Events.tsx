import styles from "@/styles/styles"
import EventCard from "./EventCard"

const Events = () => {
  return (
    <div>
    <div className={`${styles.section}`}>

      <div className="grid w-full">
         <EventCard/>
      </div>
    </div>
  </div>
  )
}

export default Events
