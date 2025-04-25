import { setMileageDispatch } from "@/Slices/FilterSlice";
import { debounce } from "@/utils/debounce";
import { convertNumber, convertNumberKm } from "@/utils/splitNumber";
import { Slider } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const MyFilterMileage = () => {
  const [value, setValue] = useState([0, 300000]);
  const dispatch = useDispatch();
  const debounceDispatch = debounce(dispatch, 1500);

  const handleChange = (newValue: number[]) => {
    setValue(newValue);

    debounceDispatch(setMileageDispatch(newValue));
  };
  return (
    <>
      <h2 className="text-left my-3 font-bold">Пробег</h2>
      <div className="w-full h-10 border-2 flex justify-between px-3">
        <div>{convertNumberKm(value[0])} км</div>
        <div>{convertNumberKm(value[1])} км</div>
      </div>
      <Slider
        range={{ draggableTrack: true }}
        // onChange={(e) => setValue(e)}
        min={0}
        max={300000}
        step={5000}
        value={value}
        onChange={(newValue: number[]) => handleChange(newValue)}
        className="h-10 "
      />
      <div className="w-full bg-gray-500 h-0.5 mt-7"></div>
    </>
  );
};

export default MyFilterMileage;
