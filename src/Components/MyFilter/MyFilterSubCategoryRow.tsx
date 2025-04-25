import { getManufactureSubCategory } from "@/Servise";
import React, { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/UI/ShancdAccordion";
import { Checkbox } from "@/UI/ShadcnCheckBox";
import { Button } from "@/UI/ShadcnButton";
import MyFilterGenerationRow from "./MyFilterGenerationRow";
import { AppDispatch } from "@/Store/Store";
import { useDispatch } from "react-redux";
import { setModelGroupSlugDispatch } from "@/Slices/FilterSlice";
interface SubCategoryProps {
  manufactureSlug: string | null;
}
interface Manufacturer {
  code: string;
  name: string;
  country: string;
  slug: string;
}

interface StateProps {
  code: string;
  name: string;
  slug: string;
  manufacturer: Manufacturer;
  vehicle_count: number;
}

const SubCategory: FC<SubCategoryProps> = ({ manufactureSlug }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [subCategory, setSubCategory] = useState<StateProps[] | null>(null);
  const [modelGroupSlug, setModelGroupSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (manufactureSlug) {
      getManufactureSubCategory(manufactureSlug)
        .then((res) => setSubCategory(res.data.results))
        .then(() => setLoading(false));
    }
    setModelGroupSlug(null);
  }, [manufactureSlug]);
  //   console.log(manufactureSlug, "MANUFACTURESLUG");
  //////////////////////////////////////////////////////////////////////
  const handleClick = (slug: string) => {
    setModelGroupSlug(slug);
    dispatch(setModelGroupSlugDispatch(slug));

    console.log("MODELGROUPSLUG", modelGroupSlug);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        disabled={manufactureSlug === null ? true : false}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">Модель</AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
              {subCategory?.map((item) => (
                <AccordionItem
                  key={item.name}
                  value={item.code}
                  className="border-2 border-b-amber-400-300 rounded-lg "
                  onClick={() => handleClick(item.slug)}
                >
                  <AccordionTrigger className="cursor-pointer border-2 outline-1 border-b-amber-400-300 rounded-lg ">
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <MyFilterGenerationRow model_group__slug={item.slug} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* <div className="flex flex-col gap-y-2">
              {subCategory?.map((item) => (
                <div className="flex items-center space-x-2 ">
                  <Button
                    id={item.code}
                    onClick={() => handleClick(item.code)}
                    // value={item.code}
                    // checked={subCategoryId.includes(item.code)}
                  />
                  <label
                    htmlFor={item.code}
                    className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name_english} - {item.vehicle_count}
                  </label>
                </div>
              ))}
            </div> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SubCategory;
