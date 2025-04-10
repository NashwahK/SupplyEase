import React from "react";

const Scale = ({ title, percentage }) => {
  const degree = (percentage / 100) * 180;

  return (
    <div className="bg-[#1E1033] p-4 rounded-xl text-white shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative w-40 h-20 mx-auto">
        <div className="w-full h-full bg-gradient-to-r from-green-400 to-gray-600 rounded-t-full"></div>
        <div
          className="absolute w-1 h-10 bg-white left-1/2 transform origin-bottom"
          style={{ transform: `rotate(${degree - 90}deg) translateX(-50%)` }}
        ></div>
      </div>
      <p className="text-center text-2xl font-bold mt-2">{percentage}%</p>
      <p className="text-center text-sm text-gray-400">orders shipped on time</p>
    </div>
  );
};

export default Scale;
