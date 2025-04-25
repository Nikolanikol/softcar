import { getCarsByManufacturer } from "@/Servise";
import { fetchCar } from "@/Slices/CarSlise";
import { setPageDispatch } from "@/Slices/FilterSlice";
import { AppDispatch, RootState } from "@/Store/Store";
import { Button } from "@/UI/ShadcnButton";
import { Card } from "@/UI/ShadcnCard";
import { convertNumber, convertNumberKm } from "@/utils/splitNumber";
import { Pagination, PaginationProps } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CarList = () => {
  const dispatch = useDispatch<AppDispatch>();
  ////////////////////////////////////////////
  const {
    manufacture,
    modelGroupSlug,
    modelSlug,
    maxMileage,
    minMileage,
    minPrice,
    maxPrice,
    carId,
    page,
  } = useSelector((state: RootState) => state.filterReducer);
  const { items, isLoading, currentPage, totalPage } = useSelector(
    (state: RootState) => state.carReduser
  );
  ////////////////////////////////////////////
  useEffect(() => {
    dispatch(
      fetchCar({
        manufacturerSlug: manufacture,
        modelGroupSlug,
        modelSlug,
        minMileage,
        maxMileage,
        minPrice,
        maxPrice,
        carId,
        page,
      })
    );
  }, [
    manufacture,
    modelSlug,
    modelGroupSlug,
    minMileage,
    maxMileage,
    minPrice,
    maxPrice,
    carId,
    page,
  ]);
  /////////////////////////////////////////////
  //   Pagintatin

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="min-h-screen flex flex-col gap-4 ">
      <div className="flex flex-wrap gap-4 justify-start">
        {items &&
          items.map((item) => {
            return (
              <Card
                key={item.vehicle_id}
                className="max-w-[200px] border-2 border-black overflow-hidden"
              >
                <div className="overflow-hidden h-52  flex justify-center items-center">
                  <img src={item.main_photo} alt="" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xs font-bold border-b-2 h-12">
                    {" "}
                    <span>{item.model.name}</span>
                    <span>{item.grade_detail.name}</span>
                  </div>
                  <div className="flex justify-evenly">
                    <span>Год:</span>
                    <span>{item.year} год</span>
                  </div>
                  <div className="flex justify-evenly">
                    <span>Пробег:</span>
                    <span>{convertNumberKm(item.mileage)} км</span>
                  </div>
                  <div className="flex justify-evenly">
                    <span>Цена:</span>
                    <span>{convertNumber(item.price)} 원</span>
                  </div>
                  <div className="flex justify-evenly">
                    <span>Тип топлива:</span>

                    <span>{item.fuel_type}</span>
                  </div>
                  <div>
                    <Button className="cursor-pointer self-stretch w-full">
                      {" "}
                      <Link to={`car/${item.vehicle_id}`} className=" w-full">
                        Подробнеe
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
      <></>
    </div>
  );
};

export default CarList;
