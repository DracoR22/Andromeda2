'use client'

import styles from "@/styles/styles"
import EventCard from "./EventCard"
import { useSelector } from "react-redux";
import CatLoader from "./loaders/CatLoader";
import Header from "./navbar/Header";

const Events = () => {

  const { allEvents, isLoading } = useSelector((state: any) => state.events);

  return (
    <>
    {isLoading? (
      <CatLoader/>
    ) : (
      <div>
        <EventCard active={true} data={allEvents && allEvents[0]} />
      </div>
    )}
  </>
  )
}

export default Events
