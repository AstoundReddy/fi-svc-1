import React from "react";
import ReactSlider from "react-slider";

const RangeSlider = () => {
  return (
    <ReactSlider
      className="h-1 w-full bg-gray-300"
      thumbClassName="absolute w-5 h-5 bg-blue-500 rounded-full cursor-pointer"
      trackClassName="h-1 bg-blue-200"
      defaultValue={[25, 75]}
      ariaLabel={["Lower thumb", "Upper thumb"]}
    />
  );
};

export default RangeSlider;
