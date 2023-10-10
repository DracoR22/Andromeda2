import EventCard from '@/components/EventCard'
import Header from '@/components/navbar/Header'
import React from 'react'

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4}/>
      <EventCard active={true}/>
    </div>
  )
}

export default EventsPage
