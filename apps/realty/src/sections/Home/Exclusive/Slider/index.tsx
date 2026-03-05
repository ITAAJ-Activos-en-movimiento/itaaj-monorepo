'use client'
import React from 'react'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { PropertyCard } from '@/components';

const Slider = ({properties}: any) => {
  return (
   
    <Swiper
    modules={[Navigation]}
    spaceBetween={20}
    slidesPerView={4}
    breakpoints={{
        768: {
          width: 768,
          slidesPerView: 3,
        },
        480: {
          width: 480,
          slidesPerView: 2,
        },
        280: {
          width: 300,
          slidesPerView: 1,
        },
      }}
     
    navigation
    // onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
>
          {properties
?.filter((property: any) => property.category == 'exclusive')
.sort((property:any) => property.price - property.price)
.map((property: any) => (
        <SwiperSlide key={property.id} >
        <PropertyCard {...property} />
    </SwiperSlide>
    ))}                
</Swiper>
  )
}

export default Slider