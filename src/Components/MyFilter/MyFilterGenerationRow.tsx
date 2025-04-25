import { getModelsGeneration } from "@/Servise";
import { setModelSlugDispatch } from "@/Slices/FilterSlice";
import { AppDispatch } from "@/Store/Store";
import { Checkbox } from "@/UI/ShadcnCheckBox";
import { RadioGroup, RadioGroupItem } from "@/UI/ShadcnRadioGroup";
import { Label } from "@radix-ui/react-label";

import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
interface MyFilterGenerationRowProps {
  model_group__slug: string | null;
}
interface Manufacturer {
  code: string;
  name: string;
  slug: string;
  country: string;
  vehicle_count: number;
}

interface ModelGroup {
  code: string;
  name: string;
  slug: string;
  manufacture: Manufacturer;
}

interface GenerationData {
  code: string;
  name: string;
  slug: string;
  model_group: ModelGroup;
  vehicle_count: number;
}
const MyFilterGenerationRow: FC<MyFilterGenerationRowProps> = ({
  model_group__slug,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [generationData, setGenerationData] = useState<GenerationData[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  ////////////////////////////////////////////////////////////////////
  const [modelSlugId, setModelSlugId] = useState<string | null>(null);
  const handleClick = (string: string) => {
    setModelSlugId(string);
    dispatch(setModelSlugDispatch(string));
    console.log("MODELSLUGID", modelSlugId);
  };
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (model_group__slug) {
      getModelsGeneration(model_group__slug)
        .then((res) => setGenerationData(res.data.results))
        .then(() => setLoading(false));
    }
    setGenerationData(null);
  }, [model_group__slug]);
  //   //////////////////////////////////////////////////////////////////
  useEffect(() => {}, [modelSlugId]);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="pt-3">
      <RadioGroup>
        {generationData?.map((item) => (
          <div key={item.code} className="flex items-center space-x-2 pl-5">
            <RadioGroupItem
              className="cursor-pointer"
              value={item.code}
              id={item.name}
              onClick={() => handleClick(item.slug)}
            />
            <Label
              className="cursor-pointer border-1 w-full "
              htmlFor={item.name}
            >
              <div className="flex justify-between w-full pr-4">
                <span> {item.name}</span> <span>{item.vehicle_count}</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default MyFilterGenerationRow;
