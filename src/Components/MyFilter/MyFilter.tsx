import { getManufacture } from "@/Servise";
import { Button } from "@/UI/ShadcnButton";
import { useEffect, useState } from "react";
import SubCategory from "./MyFilterSubCategoryRow";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "antd";

import clsx from "clsx";
import { AppDispatch } from "@/Store/Store";
import {
  setCarIdDispatch,
  setManufactureDispatch,
  setModelGroupSlugDispatch,
  setModelSlugDispatch,
  setPageDispatch,
} from "@/Slices/FilterSlice";
import MyFilterMileage from "./MyFilterMileage";
import MyFilterPrice from "./MyFilterPrice";
import { Input } from "@/UI/ShadcnInput";
interface ManufactureType {
  code: string;
  country: string;
  name: string;
  slug: string;
  vehicle_count: number;
}
const MyFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [manufacture, setManufacture] = useState<ManufactureType[] | null>(
    null
  );
  const [manufactureSlug, setManufactureSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getManufacture()
      .then((res) => setManufacture(res.data.results))
      .then(() => setLoading(false));
  }, []);
  const handleClick = (number: string) => {
    const name = manufacture.find((item) => item.code === number)?.slug;
    setManufactureSlug(name);

    dispatch(setManufactureDispatch(name));
    dispatch(setModelGroupSlugDispatch(null));
    dispatch(setModelSlugDispatch(null));
    dispatch(setPageDispatch(1));
    // console.log("MANUFACTURECODE", number, name);
  };
  ///////////////////////////////////////////////////////////////////////////
  const [carNumber, setCarNumber] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("CARNUMBER", carNumber);
    dispatch(setCarIdDispatch(carNumber));
    console.log("CARNUMBER", carNumber);
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className=" min-w-[300px] min-h-36 border-2 rounded-2xl px-2 mx-3 sticky top-0 z-10  ">
      <form action="">
        <div className="flex flex-col gap-2 text-left text-3xl ">
          <label className="text-3xl font-bold" htmlFor="manufacture">
            Производитель
          </label>
          <div>
            <ul className="flex flex-col gap-2">
              {manufacture?.map((item) => (
                <Button
                  variant={
                    manufactureSlug === item.slug ? "destructive" : "default"
                  }
                  type="button"
                  key={item.code}
                  className="min-w-[80px]  flex justify-between cursor-pointer"
                  onClick={() => handleClick(item.code)}
                >
                  {" "}
                  <span>{item.name} </span> <span>{item.vehicle_count} </span>
                </Button>
              ))}
            </ul>
          </div>
        </div>
        {/* //////////////////////////////////////////// */}
        <SubCategory manufactureSlug={manufactureSlug} />
        {/* //////////////////////////////////////////// */}
        <MyFilterMileage />
        <MyFilterPrice />
        <div className="flex flex-col gap-y-4 gap-2 text-left text-3xl mt-6 ">
          <Input
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            className=""
            placeholder="Пример 12가1234"
          />
          <Button
            type="button"
            className="w-full cursor-pointer"
            onClick={handleSubmit}
          >
            {" "}
            Найти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyFilter;
