'use client'

import EventCard from '@/components/EventCard'
import CatLoader from '@/components/loaders/CatLoader';
import Header from '@/components/navbar/Header'
import Heading from '@/utils/Heading';
import React from 'react'
import { useSelector } from 'react-redux';

const EventsPage = () => {

  const { allEvents, isLoading } = useSelector((state: any) => state.events);

  return (
    <>
    <Heading title={`Events - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
    {isLoading ? (
      <CatLoader/>
    ) : (
      <div>
        <Header activeHeading={4} />
        <EventCard active={true} data={allEvents && allEvents[0]} />
      </div>
    )}
  </>
  )
}

export default EventsPage
