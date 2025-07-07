import { useState } from "react";

export default function CardDemo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-xs w-full mx-auto">
      <div
        className="group w-full cursor-pointer overflow-hidden relative h-96 rounded-md shadow-xl flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800 transition-all duration-500"
        style={{
          backgroundImage: isHovered 
            ? "url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)"
            : "url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dark overlay on hover */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isHovered ? "opacity-50" : "opacity-0"
          }`}
        />
        
        {/* Content */}
        <div className="text relative z-10">
          <h1 className="font-bold text-xl md:text-3xl text-white relative mb-2">
            Background Overlays
          </h1>
          <p className="font-normal text-base text-white relative opacity-90">
            This card displays background gifs on hover with a smooth transition effect.
          </p>
        </div>
      </div>
    </div>
  );
}