"use client";

import { KeyTextField } from '@prismicio/client'
import React, { useEffect, useState,useRef } from 'react'

type Props = {
    youtubeID: KeyTextField
}

export const LazyYoutubePlayer = ({youtubeID}: Props) => {
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const currentContainerRef = containerRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    setIsInView(true);
                    // console.log("Video is in view!");
                  }
                });
              },
              { threshold: 0, rootMargin: "1500px" }
        );

        if(currentContainerRef){
            observer.observe(currentContainerRef);
        }

        return ()=>{
            if(currentContainerRef){
                observer.unobserve(currentContainerRef)
            }
        }
    },[])

    return (
        <div className='relative h-full w-full' ref={containerRef}>
            {isInView && (

           <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeID}?autoplay=1&mute=1&loop=1&playlist=${youtubeID}`} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' className='pointer-events-none h-full w-full border-0'/> 
            )}  
        </div>
    )
}

