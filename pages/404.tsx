import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex-row text-center ">
        <label className="text-8xl font-extrabold font-inter text-primary_light_color">
          404
        </label>
        <h1 className="text-3xl font-light text-center ">Page Not Found</h1>
        <span className="text-4xl">&#x1F622;</span>
      </div>
    </div>
  );
};

export default NotFound;
