import React from "react";
import { setPriceDispatch } from "@/Slices/FilterSlice";
import { debounce } from "@/utils/debounce";
import { Slider } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { convertNumber } from "@/utils/splitNumber";
const MyFilterPrice = () => {
  const [value, setValue] = useState([100, 20000]);
  const dispatch = useDispatch();
  const debounceDispatch = debounce(dispatch, 1500);

  const handleChange = (newValue: number[]) => {
    setValue(newValue);

    debounceDispatch(setPriceDispatch(newValue));
  };
  return (
    <>
      <h2 className="text-left my-3 font-bold">Цена</h2>
      <div className="w-full h-10 border-2 flex justify-between px-3">
        <div>{convertNumber(value[0])} 원</div>
        <div>{convertNumber(value[1])} 원</div>
      </div>
      <Slider
        range={{ draggableTrack: true }}
        // onChange={(e) => setValue(e)}
        min={100}
        max={20000}
        step={100}
        value={value}
        onChange={(newValue: number[]) => handleChange(newValue)}
        className="h-10 "
      />
      <div className="w-full bg-gray-500 h-0.5 mt-7"></div>
    </>
  );
};

export default MyFilterPrice;
