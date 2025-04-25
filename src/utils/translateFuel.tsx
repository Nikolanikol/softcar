export const translateFuel = (string: string): string => {
  switch (string) {
    case "hybrid":
      return "Гибрид";
    case "gasoline":
      return "Бензин";
    case "diesel":
      return "Дизель";
    case "lpg":
      return "Газ";
    default:
      return "Не найдено";
  }
};
