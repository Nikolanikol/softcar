import Home from "./Home";
import About from "./About";
import CarPage from "./CarPage";

interface Route {
  path: string;
  component: React.ReactNode;
  exact: boolean;
}
interface Link {
  path: string;
  name: string;
}
export const routes: Route[] = [
  {
    path: "/",
    component: <Home />,
    exact: true,
  },
  {
    path: "/about",
    component: <About />,
    exact: true,
  },
  {
    path: "/car/:id",
    component: <CarPage />,
    exact: true,
  },
];

export const links: Link[] = [
  {
    path: "/",
    name: "Мой каталог",
  },
  {
    path: "/about",
    name: "О нас",
  },
];
