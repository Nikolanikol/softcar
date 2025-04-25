import { $host } from "./Axios";

const getManufacture = async () => {
  const res = await $host.get("/apix/encar/v2/catalog/manufacturers/");
  return res;
};

const getManufactureSubCategory = async (manufactureSlug: string) => {
  const res = await $host.get(`/apix/encar/v2/catalog/model-groups`, {
    params: {
      manufacturer__slug: manufactureSlug,
    },
  });
  return res;
};

const getModelsGeneration = async (subCategoryId: string) => {
  const res = await $host.get(`/apix/encar/v2/catalog/models`, {
    params: {
      model_group__slug: subCategoryId,
      limit: 100,
    },
  });
  return res;
};

const getCarsByManufacturer = async (manufactureName: string | null) => {
  if (manufactureName === null) return [];
  const res = await $host.get(`/apix/encar/v2/vehicles`, {
    params: {
      manufacturer_slug: manufactureName,
      limit: 20,
    },
  });
  return res;
};
const getCarsById = async (id: string | undefined) => {
  if (!id) return [];

  const res = await $host.get(`/apix/encar/v2/vehicles/${id}`);
  return res;
};

export {
  getManufacture,
  getManufactureSubCategory,
  getModelsGeneration,
  getCarsByManufacturer,
  getCarsById,
};
