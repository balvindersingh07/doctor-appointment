import { useState, useEffect } from "react";

const banners = [
  { id:1, text:"Book Appointments Easily", color:"bg-indigo-600" },
  { id:2, text:"Upload Medical Reports", color:"bg-emerald-600" },
  { id:3, text:"Track Your Appointments", color:"bg-pink-600" },
];

export default function BannerCarousel(){
  const [index,setIndex] = useState(0);

  useEffect(()=>{
    const timer = setInterval(()=> setIndex((i)=>(i+1)%banners.length),3000);
    return ()=>clearInterval(timer);
  },[]);

  return (
    <div className={`h-40 flex items-center justify-center text-white text-2xl font-bold rounded-xl shadow ${banners[index].color}`}>
      {banners[index].text}
    </div>
  );
}
