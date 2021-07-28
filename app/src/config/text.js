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

export const createIngredient = {
  general: {
    title: {
      es: "General",
      en: "General",
    },
    langs: {
      es: "Idiomas",
      en: "Languages",
    },
    name: {
      title: {
        es: "Nombre",
        en: "Name",
      },
      placeHolder: {
        es: "Ingresa el nombre del ingrediente",
        en: "Enter the ingredient's name",
      },
    },
    measuredBy: {
      title: {
        es: "Medido por",
        en: "Measured by",
      },
      options: [
        {
          key: "mass",
          es: "Masa",
          en: "Mass",
        },
        {
          key: "volume",
          es: "Volumen",
          en: "Volume",
        },
        {
          key: "piece",
          es: "Pieza",
          en: "Piece",
        },
      ],
    },
  },
  nutritionalInfo: [
    {
      key: "calories",
      name: {
        es: "Calorías totales",
        en: "Total calories",
      },
      placeholder: {
        es: "Ingresa las calorías totales",
        en: "Enter total calories",
      },
    },
    {
      key: "totalFat",
      name: {
        es: "Grasa total (gr)",
        en: "Total fat (gr)",
      },
      placeholder: {
        es: "Ingresa la grasa total",
        en: "Enter total fat",
      },
    },
    {
      key: "saturatedFat",
      name: {
        es: "Grasa saturada (gr)",
        en: "Saturated fat (gr)",
      },
      placeholder: {
        es: "Ingresa la grasa saturada",
        en: "Enter saturated fat",
      },
    },
    {
      key: "cholesterol",
      name: {
        es: "Colesterol (mg)",
        en: "Cholesterol (mg)",
      },
      placeholder: {
        es: "Ingresa el colesterol",
        en: "Enter cholesterol",
      },
    },
    {
      key: "carbohydrates",
      name: {
        es: "Carbohidratos (mg)",
        en: "Carbohydrates (mg)",
      },
      placeholder: {
        es: "Ingresa los carbohidratos",
        en: "Enter carbohydrates",
      },
    },
    {
      key: "dietaryFiber",
      name: {
        es: "Fibra dietética (gr)",
        en: "Dietary fiber (gr)",
      },
      placeholder: {
        es: "Ingresa la fibra dietética",
        en: "Enter dietary fiber",
      },
    },
    {
      key: "sugar",
      name: {
        es: "Azúcar (gr)",
        en: "Sugar (gr)",
      },
      placeholder: {
        es: "Ingresa la azúcar",
        en: "Enter the sugar",
      },
    },
    {
      key: "protein",
      name: {
        es: "Proteína (gr)",
        en: "Protein (gr)",
      },
      placeholder: {
        es: "Ingresa la proteína",
        en: "Enter the protein",
      },
    },
    {
      key: "sodium",
      name: {
        es: "Sodio (mg)",
        en: "Sodium (mg)",
      },
      placeholder: {
        es: "Ingresa el sodio",
        en: "Enter the sodium",
      },
    },
    {
      key: "calcium",
      name: {
        es: "Calcio (mg)",
        en: "Calcium (mg)",
      },
      placeholder: {
        es: "Ingresa el calcio",
        en: "Enter the calcium",
      },
    },
    {
      key: "iron",
      name: {
        es: "Hierro (mg)",
        en: "Iron (mg)",
      },
      placeholder: {
        es: "Ingresa el hierro",
        en: "Enter the iron",
      },
    },
    {
      key: "potassium",
      name: {
        es: "Potasio (mg)",
        en: "Potassium (mg)",
      },
      placeholder: {
        es: "Ingresa el potasio",
        en: "Enter the potassium",
      },
    },
    {
      key: "vitaminD",
      name: {
        es: "Vitamina D (mcg)",
        en: "Vitamin D (mcg)",
      },
      placeholder: {
        es: "Ingresa la vitamina D",
        en: "Enter the vitamin D",
      },
    },
  ],
  nutritionalInfoTitle: {
    es: "Valor nutricional",
    en: "Nutritional value",
  },
  createBtn: {
    es: "Crear ingrediente",
    en: "Create ingredient",
  },
  error: {
    es: "Asegúrate de haber ingresado toda la información correctamente",
    en: "Make sure you have entered all the information correctly",
  },
};

export const langs = {
  available: [
    { key: "en", name: { es: "Inglés", en: "English" } },
    { key: "es", name: { es: "Español", en: "Spanish" } },
  ],
  default: "en",
};

export const createRecipe = {
  general: {
    title: {
      es: "General",
      en: "General",
    },
    langs: {
      es: "Idiomas",
      en: "Languages",
    },
    img: {
      title: {
        es: "Foto",
        en: "Photo",
      },
      btn: {
        es: "Agregar foto",
        en: "Add photo",
      },
      placeholder: {
        es: "(Agrega una foto)",
        en: "(Add a photo)",
      },
    },
    name: {
      title: {
        es: "Nombre",
        en: "Name",
      },
      placeholder: {
        es: "Ingresa el nombre de la receta",
        en: "Enter the recipe's name",
      },
    },
    description: {
      title: {
        es: "Descripción",
        en: "Description",
      },
      placeholder: {
        es: "Describe la receta",
        en: "Describe de recepy",
      },
    },
    category: {
      title: {
        es: "Categoría",
        en: "Category",
      },
      create: {
        title: {
          es: "Crear nueva categoría",
          en: "Create new category",
        },
        placeholder: {
          es: "Ingresa la nueva categoría",
          en: "Enter the new category's name",
        },
        btn: {
          es: "Crear categoría",
          en: "Create category",
        },
      },
    },
  },
  prep: {
    title: {
      es: "Preparación",
      en: "Preparation",
    },
    servings: {
      es: "Porciones de la receta",
      en: "Recipe servings",
    },
    time: {
      title: {
        es: "Tiempo",
        en: "Time",
      },
      prep: {
        es: "Minutos de preparación",
        en: "Preparation minutes",
      },
      cook: {
        es: "Minutos de cocción/cocina",
        en: "Cooking minutes",
      },
      total: {
        es: (total) => `Total: ${total} minutos`,
        en: (total) => `Total: ${total} minutes`,
      },
    },
    ingredients: {
      title: {
        es: "Ingredientes",
        en: "Ingredients",
      },
      placeholder: {
        es: "Ingresa el nombre del ingrediente",
        en: "Enter the ingredient's name",
      },
      quantity: {
        es: "Cantidad",
        en: "Quantity",
      },
      unit: {
        title: {
          es: "Unidad",
          en: "Unit",
        },
        placeholder: {
          es: "Ingresa la unidad de la cantidad del ingrediente",
          en: "Enter the unit of the ingredient's quantity",
        },
        suggestions: {
          mass: [
            {
              key: "kg",
              es: "Kilogramos",
              en: "Kilograms",
            },
            {
              key: "gr",
              es: "Gramos",
              en: "Grams",
            },
          ],
          volume: [
            {
              key: "teaspoon",
              es: "Cucharaditas",
              en: "Teaspoons",
            },
            {
              key: "tablespoon",
              es: "Cucharadas",
              en: "Tablespoons",
            },
            {
              key: "cup",
              es: "Tazas",
              en: "Cups",
            },
            {
              key: "L",
              es: "Litros",
              en: "Cucharadas",
            },
          ],
          piece: [
            {
              key: "piece",
              es: "Piezas",
              en: "Pieces",
            },
          ],
        },
      },
      btn: {
        es: "Agregar ingrediente",
        en: "Add ingredient",
      },
    },
    instructions: {
      title: {
        es: "Instrucciones",
        en: "Instructions",
      },
      placeHolder: {
        es: "Ingresa la instrucción",
        en: "Enter the instruction",
      },
      btn: {
        es: "Agregar instrucción",
        en: "Add instruction",
      },
    },
  },
  Opc: {
    title: {
      es: "Opcionales",
      en: "Optionals",
    },
    notes: {
      title: {
        es: "Notas (opcional)",
        en: "Notes (optional)",
      },
      placeholder: {
        es: "Ingresa las notas",
        en: "Enter the notes",
      },
    },
    hashtags: {
      title: {
        es: "# Etiquetas (opcional)",
        en: "# Hashtags (optional)",
      },
      create: {
        title: {
          es: "Crear nueva etiqueta",
          en: "Create new tag",
        },
        placeholder: {
          es: "Ingresa el nombre de la nueva etiqueta",
          en: "Enter the new hashtag's name",
        },
        btn: {
          es: "Crear etiqueta",
          en: "Create tag",
        },
      },
    },
    creator: {
      es: "Asignar creador (opcional)",
      en: "Asign creator (optional)",
    },
    accompaniments: {
      title: {
        es: "Acompañamientos",
        en: "Accompaniments",
      },
      placeholder: {
        es: "Ingresa el nombre de algún acompañamiento",
        en: "Enter the name of an accompaniment",
      },
      select: {
        es: "Seleccionar",
        en: "Select",
      },
    },
    submit: {
      publish: {
        es: "Publicar receta",
        en: "Publish recipe",
      },
      saveDraft: {
        es: "Guardar borrador",
        en: "Save draft",
      },
      error: {
        network: {
          es: "Error de conexión",
          en: "Network error",
        },
        inputs: {
          es: "Ingresa información válida",
          en: "Invalid inputs",
        },
      },
    },
  },
};
