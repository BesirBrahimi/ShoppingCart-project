import React from "react";
import "./Skeleton.css";

const Skeleton = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-image"></div>
      <div className="skeleton-details">
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );
};

export default Skeleton;
