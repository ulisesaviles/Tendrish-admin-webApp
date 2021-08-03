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
  quantity: {
    title: {
      es: "Contenido nutricional para cada:",
      en: "Nutritional content for each:",
    },
    unit: {
      mass: {
        es: "Gramos",
        en: "Grams",
      },
      volume: {
        es: "Militros",
        en: "Milliliters",
      },
      piece: {
        es: "Piezas",
        en: "Pieces",
      },
    },
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
              en: "Liters",
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

export const viewRecipe = {
  search: {
    title: {
      es: "Buscador de recetas",
      en: "Recipe finder",
    },
    placeholder: {
      es: "Ingresa el nombre de alguna receta",
      en: "Enter the name of a recipe",
    },
    visibility: {
      shown: {
        es: "Disponible",
        en: "Displayed",
      },
      hidden: {
        es: "Oculta",
        en: "Hidden",
      },
    },
    viewBtn: {
      en: "View",
      es: "Ver",
    },
    states: {
      undone: {
        es: "Presiona el botón de búsqueda",
        en: "Press the search button",
      },
      empty: {
        es: "Ninguna receta coincide con su búsqueda",
        en: "No recipe matches your search",
      },
    },
  },
  recipe: {
    title: {
      es: "Receta",
      en: "Recipe",
    },
    options: {
      visibility: {
        shown: {
          es: "Disponible",
          en: "Displayed",
        },
        hidden: {
          es: "Oculta",
          en: "Hidden",
        },
      },
      editBtn: {
        es: "Editar receta",
        en: "Edit recipe",
      },
      deleteRecipe: {
        es: "Eliminar receta",
        en: "Delete recipe",
      },
      isInFreeTrial: {
        true: {
          es: "Gratis",
          en: "Free",
        },
        false: {
          es: "Premium",
          en: "Premium",
        },
      },
    },
    recipe: {
      ingredients: {
        title: {
          es: "Ingredientes",
          en: "Ingredients",
        },
        servings: {
          es: "Porciones",
          en: "Servings",
        },
      },
      instructions: {
        es: "Instrucciones",
        en: "Instructions",
      },
      accompaniments: {
        title: {
          es: "Acompañamientos",
          en: "Accompaniments",
        },
        viewBtn: {
          es: "Ver",
          en: "View",
        },
      },
      nutrivalues: {
        title: {
          es: "Información Nutricional",
          en: "Nutrition Facts",
        },
        dailyValue: {
          es: "(Basado en una dieta diaria de 2,000 calorías)",
          en: "(Based on a 2,000 calorie daily diet)",
        },
      },
      nutritionalInfo: [
        {
          key: "calories",
          name: {
            es: "Calorías",
            en: "Calories",
          },
          unit: "",
          className: "calories",
          dailyValue: null,
        },
        {
          key: "totalFat",
          name: {
            es: "Grasa total",
            en: "Total fat",
          },
          unit: "gr",
          className: "nutrifact",
          dailyValue: 65,
        },
        {
          key: "saturatedFat",
          name: {
            es: "Grasa saturada",
            en: "Saturated fat",
          },
          unit: "gr",
          className: "subnutrifact",
          dailyValue: 20,
        },
        {
          key: "cholesterol",
          name: {
            es: "Colesterol",
            en: "Cholesterol",
          },
          unit: "mg",
          className: "nutrifact",
          dailyValue: 300,
        },
        {
          key: "sodium",
          name: {
            es: "Sodio",
            en: "Sodium",
          },
          unit: "mg",
          className: "nutrifact",
          dailyValue: 2400,
        },
        {
          key: "carbohydrates",
          name: {
            es: "Carbohidratos",
            en: "Carbohydrates",
          },
          unit: "mg",
          className: "nutrifact",
          dailyValue: 300,
        },
        {
          key: "dietaryFiber",
          name: {
            es: "Fibra dietética",
            en: "Dietary fiber",
          },
          unit: "gr",
          className: "subnutrifact",
          dailyValue: 25,
        },
        {
          key: "sugar",
          name: {
            es: "Azúcar",
            en: "Sugar",
          },
          unit: "gr",
          className: "subnutrifact",
          dailyValue: null,
        },
        {
          key: "protein",
          name: {
            es: "Proteína",
            en: "Protein",
          },
          unit: "gr",
          className: "nutrifact",
          dailyValue: null,
        },
        // {
        //   key: "calcium",
        //   name: {
        //     es: "Calcio",
        //     en: "Calcium",
        //   },
        //   unit: "mg",
        //   className: "mineral",
        //   dailyValue: 1300,
        // },
        // {
        //   key: "iron",
        //   name: {
        //     es: "Hierro",
        //     en: "Iron",
        //   },
        //   unit: "mg",
        //   className: "mineral",
        //   dailyValue: 18,
        // },
        // {
        //   key: "potassium",
        //   name: {
        //     es: "Potasio",
        //     en: "Potassium",
        //   },
        //   unit: "mg",
        //   className: "mineral",
        //   dailyValue: 4700,
        // },
        // {
        //   key: "vitaminD",
        //   name: {
        //     es: "Vitamina D",
        //     en: "Vitamin D",
        //   },
        //   unit: "mcg",
        //   className: "mineral",
        //   dailyValue: 20,
        // },
      ],
      like: {
        es: "Me gusta",
        en: "Like",
      },
      dislike: {
        en: "Dislike",
        es: "No me gusta",
      },
      units: {
        mass: {
          kg: {
            es: "kg",
            en: "kg",
          },
          gr: {
            es: "gr",
            en: "gr",
          },
        },
        volume: {
          teaspoon: {
            es: "cucharaditas",
            en: "teaspoons",
          },
          tablespoon: {
            es: "cucharadas",
            en: "tablespoons",
          },
          cup: {
            es: "tazas",
            en: "cups",
          },
          L: {
            es: "L",
            en: "L",
          },
        },
        piece: {
          piece: {
            es: "pzs",
            en: "pcs",
          },
        },
      },
      notes: {
        es: "Notas",
        en: "Notes",
      },
    },
    deleteConfirmation: {
      es: (recipeName) => `Eliminarás la receta "${recipeName}"`,
      en: (recipeName) => `You will delete the recipe "${recipeName}"`,
    },
    empty: {
      es: "Selecciona una receta",
      en: "Select a recipe",
    },
  },
};

export const profiles = {
  title: {
    es: "Perfiles administradores",
    en: "Admin profiles",
  },
  addBtn: {
    es: "Crear perfil",
    en: "Create profile",
  },
  headers: [
    { key: "name", es: "Nombre", en: "Name" },
    { key: "recipesCreated", es: "Número de recetas", en: "Number of recipes" },
    {
      key: "likesRatio",
      es: "Proporción de likes/dislikes",
      en: "Likes/dislikes ratio",
    },
    { key: "appointments", es: "Número de citas", en: "Appointments" },
    { key: "date", es: "Fecha de ingreso", en: "Date of admission" },
  ],
  editBtn: { es: "Editar perfil", en: "Edit profile" },
  popups: {
    edit: {
      title: {
        es: "Editar perfil",
        en: "Edit profile",
      },
      email: {
        title: {
          es: "Correo electrónico",
          en: "Email",
        },
      },
      name: {
        title: {
          es: "Nombre",
          en: "Name",
        },
        placeHolder: {
          es: "Ingresa el nuevo nombre del administrador",
          en: "Enter the admin's new name",
        },
      },
      password: {
        title: {
          es: "Contraseña",
          en: "Password",
        },
        placeHolder: {
          es: "Ingresa la nueva contraseña del administrador",
          en: "Enter the admin's new password",
        },
        show: {
          es: "Mostrar contraseña",
          en: "Show password",
        },
        hide: {
          es: "Ocultar contraseña",
          en: "Hide password",
        },
      },
      rol: {
        title: {
          es: "Rol",
          en: "Rol",
        },
        options: ["Admin", "Super admin"],
      },
      availabilityRange: {
        title: {
          es: "Rango de disponibilidad",
          en: "Availability range",
        },
        from: {
          es: "De",
          en: "From",
        },
        to: {
          es: "a",
          en: "to",
        },
        and: {
          es: "y",
          en: "and",
        },
      },
      submit: {
        es: "Guardar cambios",
        en: "Save changes",
      },
    },
    add: {
      title: {
        es: "Crear perfil",
        en: "Create profile",
      },
      email: {
        title: {
          es: "Correo electrónico",
          en: "Email",
        },
        placeHolder: {
          es: "Ingresa el correo del nuevo administrador",
          en: "Enter the new admin's email",
        },
      },
      name: {
        title: {
          es: "Nombre",
          en: "Name",
        },
        placeHolder: {
          es: "Ingresa el nombre del nuevo administrador",
          en: "Enter the new admin's name",
        },
      },
      password: {
        title: {
          es: "Contraseña",
          en: "Password",
        },
        placeHolder: {
          es: "Ingresa la contraseña del nuevo administrador",
          en: "Enter the new admin's password",
        },
        show: {
          es: "Mostrar contraseña",
          en: "Show password",
        },
        hide: {
          es: "Ocultar contraseña",
          en: "Hide password",
        },
      },
      rol: {
        title: {
          es: "Rol",
          en: "Rol",
        },
        options: ["Admin", "Super admin"],
      },
      availabilityRange: {
        title: {
          es: "Rango de disponibilidad",
          en: "Availability range",
        },
        from: {
          es: "De",
          en: "From",
        },
        to: {
          es: "a",
          en: "to",
        },
        and: {
          es: "y",
          en: "and",
        },
      },
      submit: {
        es: "Crear administrador",
        en: "Create admin",
      },
    },
  },
};
