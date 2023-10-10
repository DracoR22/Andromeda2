import styles from "@/styles/styles"
import EventCard from "./EventCard"

const Events = () => {
  return (
    <div>
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className="font-semibold text-2xl mb-2">Today&apos;s Special Offer!</h1>
      </div>
      <div className="grid w-full">
         <EventCard/>
      </div>
    </div>
  </div>
  )
}

export default Events
