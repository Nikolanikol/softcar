import CarList from "@/Components/CarList/CarList";
import MyFilter from "@/Components/MyFilter/MyFilter";
import { setPageDispatch } from "@/Slices/FilterSlice";
import { RootState } from "@/Store/Store";
import { Pagination, PaginationProps } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const page = useSelector((state: RootState) => state.filterReducer.page);
  const total = useSelector((state: RootState) => state.carReduser.totalCount);
  const dispatch = useDispatch();
  const paginationHandleChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
    dispatch(setPageDispatch(current));
  };
  return (
    <div>
      <div className="max-w-[1200px] overflow-hidden">
        <div className="grid grid-cols-6 gap-x-2 gap-y-4 pt-5">
          <div className="col-span-2  relative ">
            <MyFilter />
          </div>
          <div className="col-span-4 border-2 border-gray-300 rounded-md">
            <CarList />
          </div>
          <div className="flex justify-center border-2 border-gray-300 rounded-md col-span-6">
            <br />

            <Pagination
              current={page}
              showSizeChanger
              //   onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={total}
              onChange={paginationHandleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
