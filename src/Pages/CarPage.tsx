import { getCarsById } from "@/Servise";
import { Button } from "@/UI/ShadcnButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/UI/ShadcnCarousel";
import { convertNumber } from "@/utils/splitNumber";
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Manufacturer {
  code: string;
  name: string;
  name_english: string;
  country: string;
}

interface ModelGroup {
  code: string;
  name: string;
  name_english: string;
  manufacturer: Manufacturer;
}

interface GradeDetail {
  code: string;
  name: string;
  name_english: string;
  model: {
    code: string;
    name: string;
    name_english: string;
    model_group: ModelGroup;
  };
}

interface Dealer {
  user_id: string;
  code: string | null;
  name: string;
  contact_name: string;
  phone: string;
  address: string;
  type: string;
}

interface VehiclePhoto {
  id: string;
  code: string;
  path: string;
  type: string;
  description: string | null;
  image_url: string;
}

interface VehicleOption {
  id: string;
  code: string;
  name: string;
  price: number;
  description: string | null;
  type: string;
  is_standard: boolean;
  is_factory: boolean;
}

interface Inspection {
  vehicle: number;
  center: any;
  inspector_name: string;
  inspection_date: string;
  performance_number: string;
  has_accidents: boolean;
  has_repairs: boolean;
  odometer_status: string;
  vin_status: string;
  engine_status: Record<string, unknown>;
  transmission_status: Record<string, unknown>;
  electrical_status: Record<string, unknown>;
  brake_status: Record<string, unknown>;
  steering_status: Record<string, unknown>;
  inspector_notes: string | null;
}

interface VehicleHistory {
  vehicle: number;
  first_registration: string;
  owner_changes: number;
  plate_changes: number;
  total_accidents: number;
  owner_accidents: number;
  total_loss_count: number;
  flood_damage_count: number;
  previous_usage: string;
  has_commercial_use: boolean;
  has_rental_use: boolean;
}

interface VehicleDetail {
  color: string;
  price: number;
  grade_detail: GradeDetail;
  year: number;
  fuel_type: string;
  transmission: string;
  warranty_type: string;
  mileage: number;
  last_import_date: string;
  created_at: string;
  vehicle_id: number;
  main_photo: string;
  updated_at: string;
  model: {
    code: string;
    name: string;
    name_english: string;
    model_group: ModelGroup;
  };
  dealer: Dealer;
  vin: string;
  vehicle_no: string;
  first_registration_date: string | null;
  displacement: number;
  seat_count: number;
  body_type: string;
  odometer_status: string;
  vin_status: string;
  photos: VehiclePhoto[];
  options: VehicleOption[];
  inspection: Inspection;
  history: VehicleHistory;
  main_data: {
    vin: string | null;
    spec: {
      type: string;
      fuelCd: string;
      mileage: number;
      bodyName: string;
      fuelName: string;
      colorName: string;
      seatCount: number;
      customColor: string | null;
      displacement: number;
      transmissionName: string;
    };
    view: {
      encarMeetGo: number;
      encarDiagnosis: number;
    };
    manage: {
      dummy: boolean;
      viewCount: number;
      webReserved: boolean;
      reRegistered: boolean;
      dummyVehicleId: string | null;
      modifyDateTime: string;
      registDateTime: string;
      subscribeCount: number;
      firstAdvertisedDateTime: string;
    };
    photos: Array<{
      code: string;
      desc: string | null;
      path: string;
      type: string;
      updateDateTime: string;
    }>;
    contact: {
      no: string;
      userId: string;
      address: string;
      userType: string;
      contactType: string;
      isOwnerPartner: boolean;
    };
    options: {
      etc: any[];
      type: string;
      choice: string[];
      tuning: string[];
      standard: string[];
    };
    category: {
      type: string;
      gradeCd: string;
      modelCd: string;
      domestic: boolean;
      formYear: string;
      warranty: {
        bodyMonth: number;
        bodyMileage: number;
        companyName: string | null;
        userDefined: boolean;
        transmissionMonth: number;
        transmissionMileage: number;
      };
      gradeName: string;
      modelName: string;
      yearMonth: string;
      importType: string;
      originPrice: number;
      modelGroupCd: string;
      gradeDetailCd: string;
      jatoVehicleId: number;
      manufacturerCd: string;
      modelGroupName: string;
      gradeDetailName: string;
      gradeEnglishName: string;
      manufacturerName: string;
      modelGroupEnglishName: string;
      gradeDetailEnglishName: string;
      manufacturerEnglishName: string;
    };
    contents: any;
    condition: {
      seizing: {
        pledgeCount: number;
        seizingCount: number;
      };
      accident: {
        recordView: boolean;
      };
      inspection: {
        formats: string[];
      };
    };
    vehicleId: number;
    vehicleNo: string;
    partnership: {
      brand: any;
      dealer: any;
      testdrive: {
        active: boolean;
      };
    };
    vehicleType: string;
    advertisement: {
      type: string;
      price: number;
      trust: any[];
      meetGo: boolean;
      status: string;
      hotMark: any[];
      homeService: boolean;
      oneLineText: any;
      preDelivery: boolean;
      preVerified: boolean;
      salesStatus: any;
      diagnosisCar: boolean;
      encarPassType: any;
      leaseRentInfo: any;
      extendWarranty: boolean;
      directInspected: boolean;
      underBodyPhotos: any[];
      advertisementType: string;
      hasUnderBodyPhoto: boolean;
      warrantyStyleColor: any;
      encarPassCategoryType: any;
    };
  };
}
const CarPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<VehicleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCarsById(id)
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  console.log(data);
  return (
    <div>
      <div className=" mx-auto p-4">
        {/* Заголовок и базовая информация */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {data.model.name} {data.grade_detail.name}
          </h1>
          <div className="text-xl font-semibold text-primary">
            {convertNumber(data.price)} 원
          </div>
        </header>
        {/* Слайдер + инфаормация */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Галерея изображений */}
          <section className=" gap-4 mb-6 col-span-2 max-w-[900px] max-h-[550px]  overflow-hidden border-2 flex items-center justify-center">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {data.photos.map((photo) => (
                  <CarouselItem key={photo.id}>
                    <img
                      src={photo.image_url}
                      alt={photo.description || "Car photo"}
                      className="w-full  object-cover rounded-lg max-w-[900px] max-h-[550px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
          {/* Информация о производителе */}
          <div className="col-span-1">
            {/* Основные характеристики */}
            <section className="flex flex-col gap-6 mb-6">
              {/* Информация о производителе */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Производитель</h2>
                <div>
                  <p>Марка: {data.model.model_group.manufacturer.name}</p>
                  <p>
                    Модель: {data.model.name} {data.grade_detail.name}
                  </p>
                  <p>Группа модели: {data.model.model_group.name}</p>
                  <p>Вин {data.vin}</p>
                  <p>Тип кузвова {data.body_type}</p>
                  <p>Цвет: {data.color}</p>
                  <p>Номер авто {data.vehicle_no}</p>
                  <p>
                    {" "}
                    тип двигателя{" "}
                    {data.inspection_web_data.basic_info.engine_type}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="datat-xl font-semibold mb-4">Характеристики</h2>
                <ul className="space-y-2">
                  <li>Год: {data.year}</li>
                  <li>Пробег: {data.mileage.toLocaleString()} км</li>
                  <li>Топливо: {data.fuel_type}</li>
                  <li>Трансмиссия: {data.transmission}</li>
                  <li>Цвет: {data.color}</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* ремонтные работы  */}
        <div className="grid-cols-2 grid gap-4 bg-gray-100 rounded-lg">
          <div>Замены</div>
          <div>
            {data.diagnosis_data?.items?.map((item) => {
              if (item.resultCode === "REPLACEMENT") {
                return (
                  <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.result}</p>
                    <p>{item.resultCode}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        {/* Опции */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Опции</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {data.options.map((option) => (
              <div key={option.id} className="bg-gray-100 p-3 rounded-lg">
                <p>{option.name}</p>
                <span className="text-sm text-gray-600">
                  {option.is_standard ? "Стандартная" : "Дополнительная"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* История и инспекция */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">История</h2>
            <ul className="space-y-2">
              <li>Первая регистрация: {data.history.first_registration}</li>
              <li>Смена владельцев: {data.history.owner_changes}</li>
              <li>Аварии: {data.history.total_accidents}</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Инспекция</h2>
            <ul className="space-y-2">
              <li>Статус одометра: {data.inspection.odometer_status}</li>
              <li>Статус VIN: {data.inspection.vin_status}</li>
              <li>Дата инспекции: {data.inspection.inspection_date}</li>
            </ul>
          </div>
        </section>

        {/* Контакты дилера */}
        <section className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Контакты дилера</h2>
          <div>
            <p>Имя: {data.dealer.name}</p>
            <p>Телефон: {data.dealer.phone}</p>
            <p>Адрес: {data.dealer.address}</p>
          </div>
        </section>

        {/* Кнопки действий */}
        <div className="flex justify-between mt-6">
          <Button variant="outline">Связаться с дилером</Button>
          <Button>Забронировать</Button>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
