import React, { useState, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { GiTomato } from "react-icons/gi";

const App = () => {
  const [time, setTime] = useState(25 * 60); // 25 menit
  const [isRunning, setIsRunning] = useState(false); //status timer
  const [mode, setMode] = useState("pomodoro"); // mode
  const [tomatoCount, setTomatoCount] = useState(0); //jumlah pomodoro yang selesai

  useEffect(() => {
    let timer;
    // jika isRunning True dan time > 0 kurangi 1 detik
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    // jika time = 0 dan isRunning True -> setIsRunning menjadi False
    else if (time === 0 && isRunning) {
      setIsRunning(false);

      // Mainkan audio dari elemen <audio>
      const audio = document.getElementById("alarm-sound");
      if (audio) {
        audio.play().catch((err) => {
          console.log("Audio tidak bisa diputar:", err);
        });
      }

      if (mode === "pomodoro") {
        setTomatoCount(tomatoCount + 1); //tambahkan 1 ketika pomodoro selesai
        setTime(1 * 60);
      }
      if (mode === "short") setTime(5 * 60);
      if (mode === "long") setTime(15 * 60);
    }
    return () => clearInterval(timer); // masih belum paham
  }, [isRunning, time]);

  // MM:SS
  const formatTime = () => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Ganti mode
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === "pomodoro") setTime(25 * 60);
    if (newMode === "short") setTime(5 * 60);
    if (newMode == "long") setTime(15 * 60);
  };

  const handleReset = () => {
    if (mode === "pomodoro") setTime(25 * 60);
    if (mode === "short") setTime(5 * 60);
    if (mode == "long") setTime(15 * 60);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <audio id="alarm-sound" src="/alarm.wav" preload="auto"></audio>
      <div className="bg-[#FBB1AD] w-full max-w-4xl min-h-[500px] rounded-xl shadow-lg p-8 flex flex-col items-center justify-center">
        {/* Mode Buttons */}
        <div className="mb-6 flex justify-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-extrabold text-2xl rounded-full px-5 py-2 text-sm"
            onClick={() => handleModeChange("pomodoro")}
          >
            Pomodoro
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-extrabold text-2xl rounded-full px-5 py-2 text-sm"
            onClick={() => handleModeChange("short")}
          >
            Short break
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-extrabold text-2xl rounded-full px-5 py-2 text-sm"
            onClick={() => handleModeChange("long")}
          >
            Long break
          </button>
        </div>
        <div className="flex justify-center items-center gap-4 text-white mb-6">
          <h1 className="text-9xl font-bold">{formatTime()}</h1>
          <div className="relative w-12 h-12 text-4xl flex items-center justify-center">
            <span className="absolute text-6xl text-red-500">
              <GiTomato />
            </span>
            <span className="absolute text-white text-3xl font-bold text-pink-900">
              {tomatoCount}
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-red-500 hover:bg-red-600 w-10 h-10 flex items-center justify-center rounded-full text-white text-lg"
          >
            {isRunning ? (
              <FaRegPauseCircle className="text-2xl" />
            ) : (
              <FaPlayCircle className="text-2xl" />
            )}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 w-10 h-10 flex items-center justify-center rounded-full text-white text-lg"
          >
            <RiResetLeftFill className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
