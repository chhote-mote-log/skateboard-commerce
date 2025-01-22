"use client";

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import React,{useEffect, useRef} from "react";

type Props = {
  foregroundImage: ImageField;
  backgroundImage: ImageField;
  className?: string;
};

export const ParallelImage = ({
  foregroundImage,
  backgroundImage,
  className,
}: Props) => {

    const foregroundRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const targetPosition = useRef({x:0,y:0});
    const currentPosition = useRef({x:0,y:0});

    useEffect(()=>{
        const frameId = requestAnimationFrame(animationFrame);

        function animationFrame(){
            const {x:xTarget,y:yTarget}=  targetPosition.current;
            const {x:xCurrent,y:yCurrent}=  currentPosition.current;

            const newX = xCurrent+(xTarget - xCurrent) * 0.1
            const newY = yCurrent+(yTarget - yCurrent) * 0.1

            currentPosition.current = {x:newX, y:newY}

            if(backgroundRef.current){
                backgroundRef.current.style.transform = `translate(${newX}px,${newY}px)`
            }
            if(foregroundRef.current){
                foregroundRef.current.style.transform = `translate(${newX*3}px,${newY*3}px)`
            }
            requestAnimationFrame(animationFrame)
        }
        window.addEventListener("mouseover",onMouseMove);

        function onMouseMove(event:MouseEvent){
            const {innerWidth,innerHeight} = window;

            const xPercent= (event.clientX/innerWidth-0.5)*3
            const yPercent= (event.clientY/innerHeight-0.5)*3

            targetPosition.current ={
                x:xPercent * -20,
                y:yPercent * -20
            }


            return ()=>{
                window.removeEventListener("mousemove",onMouseMove)
                cancelAnimationFrame(frameId)
            }
        }
    },[])
  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
      <div ref={backgroundRef} className="col-start-1 row-start-1 transition-transform">
        <PrismicNextImage alt="" imgixParams={{height:600}} field={backgroundImage} className="w-11/12"  />
      </div>
      <div  ref={foregroundRef} className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center">
        <PrismicNextImage alt="" field={foregroundImage} imgixParams={{height:600}} className="h-full max-h-[500px] w-auto" />
      </div>
    </div>
  );
};
