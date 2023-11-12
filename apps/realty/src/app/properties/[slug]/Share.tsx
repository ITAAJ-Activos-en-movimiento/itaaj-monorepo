'use client'
import React from 'react'

const Share = () => {
    const handleShare = async () => {
        if(navigator.share){
          await navigator.share({
            title: "Itaaj Realty",
            url: window.location.href,
          });
        }
      }
  return (
    <button onClick={handleShare}><i className='bx bx-share-alt' ></i> Compartir</button>
  )
}

export default Share