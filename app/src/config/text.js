import {
  MdAddCircleOutline,
  MdTrendingUp,
  MdPeople,
  MdEdit,
  MdDateRange,
  MdRestaurant,
  MdAddToQueue,
  MdEvent,
} from "react-icons/md";
import { IoIosNutrition } from "react-icons/io";

export const tabs = [
  {
    key: "Stats",
    name: {
      es: "Estadísticas",
      en: "Stats",
    },
    icon: <MdTrendingUp className="nav-item-icon" />,
  },
  {
    key: "Profiles",
    name: {
      es: "Administrar perfiles",
      en: "Magane profiles",
    },
    icon: <MdPeople className="nav-item-icon" />,
  },
  {
    key: "EditUser",
    name: {
      es: "Editar plan de los usuarios",
      en: "Edit user's meal plan",
    },
    icon: <MdEdit className="nav-item-icon" />,
  },
  {
    key: "Agenda",
    name: {
      es: "Agenda",
      en: "Agenda",
    },
    icon: <MdDateRange className="nav-item-icon" />,
  },
  {
    key: "Recipe",
    name: {
      es: "Ver recetas",
      en: "View recipes",
    },
    icon: <MdRestaurant className="nav-item-icon" />,
  },
  {
    key: "CreateRecipe",
    name: {
      es: "Crear receta",
      en: "Create recipe",
    },
    icon: <MdAddCircleOutline className="nav-item-icon" />,
  },
  {
    key: "CreateIngredient",
    name: {
      es: "Crear ingrediente",
      en: "Create ingredient",
    },
    icon: <IoIosNutrition className="nav-item-icon" />,
  },
  {
    key: "CreateAd",
    name: {
      es: "Crear anuncio",
      en: "Create ad",
    },
    icon: <MdAddToQueue className="nav-item-icon" />,
  },
  {
    key: "CreateEvent",
    name: {
      es: "Crear evento",
      en: "Create event",
    },
    icon: <MdEvent className="nav-item-icon" />,
  },
];
