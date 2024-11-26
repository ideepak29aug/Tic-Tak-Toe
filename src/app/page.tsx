'use client'
import { useEffect, useState } from "react";
import TicTacToe from "./components/TicTacToe";
import AnimatedLoader from "./components/AnimatedLoader";

export default function Home() {
  const[loader, setloader] = useState(true)

  useEffect(() => {

    setTimeout(() => {

      setloader(false)
      
    }, 2500);
  
    
  }, [])
  return (
    <>
    {
      loader ? 
      <AnimatedLoader />
      :
      <div className="bg-[url('/bg-main.jpg')] bg-cover h-screen w-full flex justify-center items-center">
      <TicTacToe />
    </div>
    }
    </>
  );
}
