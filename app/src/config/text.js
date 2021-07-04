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

export const login = {
  title: {
    es: "Iniciar sesión",
    en: "Log in",
  },
  mailInput: {
    name: {
      es: "Correo",
      en: "Email",
    },
    placeHolder: {
      es: "alguien@ejemplo.com",
      en: "someone@example.com",
    },
  },
  passwordInput: {
    name: {
      es: "Contraseña",
      en: "Password",
    },
    placeHolder: {
      es: "Contraseña",
      en: "Password",
    },
  },
  keepSignedIn: {
    es: "Mantener sesión iniciada",
    en: "keep logged in",
  },
  btn: {
    es: "Iniciar sesión",
    en: "Log in",
  },
  forgotPassword: {
    es: "Olvidé mi contraseña",
    en: "I forgot my password",
  },
  error: {
    es: "Error al iniciar sesión, comprueba tu correo y contraseña",
    en: "Login failed, check your email and password",
  },
};
