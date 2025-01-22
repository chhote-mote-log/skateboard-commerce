"use client";
import * as THREE from "three";
import { Skateboard } from "@/app/components/Skateboard3d";
import { ContactShadows, Environment, OrbitControls,Html } from "@react-three/drei";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
// import { group } from 'console'
import React, { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hotspot from "./Hotspot";
import { WavyPaths } from "./WavyPaths";

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

const INITIAL_CAMERA = [1.4,1,1.4] as const;

export const InteractiveSkate = ({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: INITIAL_CAMERA, fov: 55 }}
      >
        <Suspense>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            boltColor={boltColor}
            truckColor={truckColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

function Scene({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
    const {camera} = useThree();

    useEffect(()=>{
        camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0));
        setZoom();
        window.addEventListener("resize",setZoom)
        
        function setZoom(){
            const scale = Math.max(Math.min(1000/window.innerWidth,2.2),1)
            camera.position.x = INITIAL_CAMERA[0]*scale;
            camera.position.y = INITIAL_CAMERA[1]*scale;
            camera.position.z = INITIAL_CAMERA[2]*scale;
        }
        return ()=>window.removeEventListener("resize",setZoom)
    },[camera])
    
    useEffect(()=>{
        if(!containerRef.current || !originRef.current) return;

        gsap.to(containerRef.current.position,{
            x:0.4,
            duration:1,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"
        })
        gsap.to(originRef.current.position,{
            y:Math.PI/60,
            duration:2,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"
        })
    },[])

  const containerRef = useRef<THREE.Group>(null);
  const originRef = useRef<THREE.Group>(null);

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();

    const board = containerRef.current;
    const origin = originRef.current;
    if (!board || !origin || animating) return;
    const { name } = event.object;

    setShowHotspot((current) => ({ ...current, [name]: false }));

    if (name === "back") {
      ollie(board);
    } else if (name === "middle") {
      kickflip(board);
    } else if (name === "front") {
      rotateSkate360(board, origin);
    }
  }
  function kickflip(board: THREE.Group) {
    jumBoard(board);
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(
        board.rotation,
        {
          z: `+=${Math.PI * 2}`,
          duration: 0.78,
          ease: "none",
        },
        0.3
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  }
  function rotateSkate360(board: THREE.Group, origin: THREE.Group) {
    jumBoard(board);
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(
        origin.rotation,
        {
          y: `+=${Math.PI * 2}`,
          duration: 0.77,
          ease: "none",
        },
        0.3
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.14,
        ease: "none",
      });
  }

  function jumBoard(board: THREE.Group) {
    setAnimating(true)
    gsap
      .timeline({onComplete:()=>setAnimating(false)})
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: "power2.out",
        delay: 0.26,
      })
      .to(board.position, {
        y: 0,
        duration: 0.43,
        ease: "power2.in",
      });
  }
  function ollie(board: THREE.Group) {
    jumBoard(board);
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  }
  const [showHotspot, setShowHotspot] = useState({
    back: true,
    middle: true,
    front: true,
  });
  const [animating, setAnimating] = useState(false);

  return (
    <primitive object={new THREE.Group()}>
      <OrbitControls  enablePan={false} enableZoom={false} enableRotate={false} />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={originRef}>
        <group ref={containerRef} position={[-0.25, 0, -0.635]}>
          <group position={[0, -0.086, 0.635]}>
            <Skateboard
              deckTextureURL={deckTextureURL}
              deckTextureURLs={[deckTextureURL]}
              wheelTextureURL={wheelTextureURL}
              wheelTextureURLs={[wheelTextureURL]}
              truckColor={truckColor}
              boltColor={boltColor}
              constantWheelSpin
            />
            <Hotspot
              position={[0, 0.38, 1]}
              isVisible={!animating && showHotspot.front}
              color="#B8FC39"
            />
            <mesh position={[0, 0.27, 0.9]} name="front" onClick={onClick}>
              <boxGeometry args={[0.6, 0.2, 0.75]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <Hotspot
              position={[0, 0.33, 0]}
              isVisible={!animating && showHotspot.middle}
              color="#FF7A51"
            />
            <mesh position={[0, 0.27, 0]} name="middle" onClick={onClick}>
              <boxGeometry args={[0.6, 0.1, 1.0]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <Hotspot
              position={[0, 0.35, -0.9]}
              isVisible={!animating && showHotspot.back}
              color="#46ACFA"
            />
            <mesh position={[0, 0.27, -0.9]} name="back" onClick={onClick}>
              <boxGeometry args={[0.6, 0.2, 0.75]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.7} position={[0, -0.08, 0]} />
      <group rotation={[-Math.PI/2,0,-Math.PI/2]} position={[-0.7,-0.3,-0.5]} scale={[0.2,0.2,0.2]}>
        <Html wrapperClass="pointer-events-none" transform zIndexRange={[1,0]} occlude="blending" >
            <WavyPaths/>
        </Html>
      </group>
    </primitive>
  );
}
