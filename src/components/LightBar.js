import React, { useRef, useState } from "react";

export default function LightBar(props) {
  const dotRef = useRef(null);
  const barRef = useRef(null);
  const [speed, setSpeed] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggelisPlaying = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const onAnimate = (value) =>
    dotRef.current.animate(
      [
        // keyframes
        { left: "0%" },
        { left: "100%" },
      ],
      {
        // timing options
        duration: value,
        direction: "alternate",
        iterations: Infinity,
      }
    );

  const getCurrentLeftPosition = () => {
    const width = window
      .getComputedStyle(barRef.current)
      .getPropertyValue("width");
    const position = window
      .getComputedStyle(dotRef.current)
      .getPropertyValue("left");
    return (
      (Number(position.replace("px", "")) / Number(width.replace("px", ""))) *
      100
    ).toFixed(0);
  };

  const increaseSpeed = () => {
    if (speed > 0) {
      setSpeed(speed - 125);
      if (isPlaying) {
        onAnimate(speed);
      }
    }
  };

  const start = () => {
    onAnimate(speed);
    toggelisPlaying();
  };

  const pause = () => {
    onAnimate(1000).pause();
    toggelisPlaying();
  };

  const decreaseSpeed = () => {
    if (speed < 2000) {
      setSpeed(speed + 125);
      if (isPlaying) {
        onAnimate(speed);
      }
    }
  };
  return (
    <>
      <div className="flex-1 flex items-center justify-center w-full bg-gray-900">
        <div className="py-20 px-2 bg-black w-full flex items-center justify-around relative border-t-2 border-gray-700 border-b-2">
          <div ref={barRef} className="mr-14 w-full">
            <div className="relative flex items-center">
              <div
                ref={dotRef}
                className="dot bg-yellow-200 absolute h-14 w-14 rounded-full text-white "
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2 pb-10">
        <div className="text-gray-600 text-xl">Speed: {1000 - speed}</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={decreaseSpeed}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <svg
              className="w-10 h-10 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {isPlaying ? (
            <button
              onClick={pause}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            >
              <svg
                className="w-10 h-10 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          ) : (
            <button
              onClick={start}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            >
              <svg
                className="w-10 h-10 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
          <button
            onClick={increaseSpeed}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <svg
              className="w-10 h-10 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
