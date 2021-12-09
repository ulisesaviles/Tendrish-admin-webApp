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
      es: "Ingredientes",
      en: "Ingredients",
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

export const navBar = {
  signOut: {
    es: "Cerrar sesión",
    en: "Sign out",
  },
};

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
    back: {
      es: "Ver ingredientes",
      en: "View ingredients",
    },
    backConfirmation: {
      es: "¿Estás seguro que quieres salir? Los cabios no serán guardados.",
      en: "Are you sure you want to go back? Changes will not be saved.",
    },
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
    aditionalInfo: {
      title: {
        es: "Información dicional",
        en: "Aditional info",
      },
      items: [
        {
          key: "redMeat",
          title: {
            es: "Es carne roja",
            en: "It's red meat",
          },
          toolTip: {
            es: "Por ejemplo: carne de res, carne de puerco, chorizo, tocino, etc.",
            en: "For example: beef, pork, bacon, etc.",
          },
        },
        {
          key: "seafood",
          title: {
            es: "Es marisco",
            en: "It's seafood",
          },
          toolTip: {
            es: "Por ejemplo: salmón, tilapia, atún, camarón, etc.",
            en: "For example: salmon, fish, tuna, shrimp, etc.",
          },
        },
        {
          key: "chicken",
          title: {
            es: "Es pollo",
            en: "It's chicken",
          },
          toolTip: {
            es: "Por ejemplo: pechuga de pollo, piernas de pollo, pollo entero, etc.",
            en: "For example: chicken breast, chicken legs, whole chicken, etc.",
          },
        },
        {
          key: "gluten",
          title: {
            es: "Contiene gluten",
            en: "It contains gluten",
          },
          toolTip: {
            es: "Por ejemplo: pan molido, bangles, pan de barra, harina de trigo, etc.",
            en: "For example: breadcrumbs, bangles, loaf bread, wheat flour, etc.",
          },
        },
        {
          key: "animalOrigin",
          title: {
            es: "Es un ingrediente de origen animal",
            en: "It’s an animal origin ingredient",
          },
          toolTip: {
            es: "Por ejemplo: leche, carne, huevo, etc.",
            en: "For example: milk, meat, egg, etc.",
          },
        },
        {
          key: "lactose",
          title: {
            es: "Contiene lactosa",
            en: "It contains lactose",
          },
          toolTip: {
            es: "Por ejemplo: leche, queso, crema, etc.",
            en: "For example: milk, cheese, cream, etc.",
          },
        },
        {
          key: "egg",
          title: {
            es: "Contiene huevo",
            en: "Contains egg",
          },
          toolTip: {
            es: "Por ejemplo: huevo, mayonesa, claras de huevo, etc.",
            en: "For example: egg, mayonnaise, egg whites, etc.",
          },
        },
        {
          key: "soy",
          title: {
            es: "Contiene soya",
            en: "Contains soy",
          },
          toolTip: {
            es: "Por ejemplo: edamames, salsa soya, tofu, etc.",
            en: "For example: edamames, soy sauce, tofu, etc.",
          },
        },
      ],
    },
    seasons: {
      title: {
        es: "Meses disponible",
        en: "Months available",
      },
      toolTip: {
        es: "Selecciona las estaciones en las que está disponible el ingrediente. Ej: mangos en verano.",
        en: "Select the seasons when the ingredient is available. Ex: mangoes in summer.",
      },
      items: [
        { key: "jan", name: { es: "Enero", en: "January" } },
        { key: "feb", name: { es: "Febrero", en: "February" } },
        { key: "mar", name: { es: "Marzo", en: "March" } },
        { key: "apr", name: { es: "Abril", en: "April" } },
        { key: "may", name: { es: "Mayo", en: "May" } },
        { key: "jun", name: { es: "Junio", en: "June" } },
        { key: "jul", name: { es: "Julio", en: "July" } },
        { key: "aug", name: { es: "Agosto", en: "August" } },
        { key: "sep", name: { es: "Septiembre", en: "September" } },
        { key: "oct", name: { es: "Octubre", en: "October" } },
        { key: "nov", name: { es: "Noviembre", en: "November" } },
        { key: "dec", name: { es: "Diciembre", en: "December" } },
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
        es: "Carbohidratos (gr)",
        en: "Carbohydrates (gr)",
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
  nutrivaluesTitle: {
    es: "Valor nutricional",
    en: "Nutritional values",
  },
  states: {
    title: {
      es: "Estados creados",
      en: "Created states",
    },
    toolTip: {
      es: "Cada estado en que se puede encontrar el ingrediente. Ej: congelado, molido, cocido, etc.",
      en: "Every state in which the ingredient can be found. Ex: frozen, ground, cooked, etc.",
    },
    default: {
      es: "default",
      en: "default",
    },
    name: {
      title: {
        es: "Nombre del estado del ingrediente",
        en: "Ingredient state name",
      },
      placeholder: {
        es: "Ingresa el nombre del estado del ingrediente. Ej: cocido",
        en: "Enter the name of the ingredient state. Ex: cooked",
      },
    },
    delete: {
      es: (name) => `¿Seguro que quieres eliminar el estado "${name}"?`,
      en: (name) => `Are you sure you want to remove the "${name}" state?`,
    },
  },
  statesTitle: {
    es: "Estados del ingrediente",
    en: "Ingredient states",
  },
  createBtn: {
    es: "Crear ingrediente",
    en: "Create ingredient",
  },
  editBtn: {
    es: "Guardar cambios",
    en: "Save changes",
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
  equivalence: {
    title: {
      es: "Equivalencia al estado inicial",
      en: "Equivalence to the initial state",
    },
    string: {
      top: {
        es: (stateCuantity, stateUnit, ingredientName, stateName) =>
          `Cada ${stateCuantity} ${stateUnit} de ${ingredientName} ${stateName} equivalen a:`,
        en: (stateCuantity, stateUnit, ingredientName, stateName) =>
          `Each ${stateCuantity} ${stateUnit} of ${stateName} ${ingredientName} is equivalent to:`,
      },
      bottom: {
        es: (defaultUnit, ingredientName) =>
          `${defaultUnit} de ${ingredientName} (en su estado inicial)`,
        en: (defaultUnit, ingredientName) =>
          `${defaultUnit} of ${ingredientName} (in its initial state)`,
      },
    },
  },
  responses: {
    success: {
      es: "¡Creado con éxito!",
      en: "Successfully created!",
    },
    error: {
      es: "Error del servidor",
      en: "Server error",
    },
    editSuccess: {
      es: "¡Actualizado con éxito!",
      en: "Successfully updated!",
    },
  },
};

export const viewIngredient = {
  search: {
    title: {
      es: "Buscar ingrediente",
      en: "Seach ingredient",
    },
    placeholder: {
      es: "Ingresa el nombre de algún ingrediente",
      en: "Enter an ingredient name",
    },
    create: {
      es: "Crear ingrediente",
      en: "Create ingredient",
    },
    or: {
      es: "ó",
      en: "or",
    },
    states: {
      null: {
        es: "Ingresa el nombre de algún ingrediente",
        en: "Enter an ingredient name",
      },
      loading: {
        es: "Cargando...",
        en: "Loading...",
      },
      empty: {
        es: (name) => `No hay ingredientes llamados "${name}"`,
        en: (name) => `There are not ingredients called "${name}"`,
      },
    },
  },
  view: {
    title: {
      es: "Detalles del ingrediente",
      en: "Ingredient's detaills",
    },
    name: {
      es: "Nombre",
      en: "Name",
    },
    measuredBy: {
      title: {
        es: "Medido por",
        en: "Measured by",
      },
      mass: { es: "Masa", en: "Mass" },
      volume: { es: "Volumen", en: "Volume" },
      piece: { es: "Pieza", en: "Piece" },
    },
    seasons: {
      jan: { es: "Enero", en: "January" },
      feb: { es: "Febrero", en: "February" },
      mar: { es: "Marzo", en: "March" },
      apr: { es: "Abril", en: "April" },
      may: { es: "Mayo", en: "May" },
      jun: { es: "Junio", en: "June" },
      jul: { es: "Julio", en: "July" },
      aug: { es: "Agosto", en: "August" },
      sep: { es: "Septiembre", en: "September" },
      oct: { es: "Octubre", en: "October" },
      nov: { es: "Noviembre", en: "November" },
      dec: { es: "Diciembre", en: "December" },
    },
    aditionalInfo: {
      title: {
        es: "Información dicional",
        en: "Aditional info",
      },
      empty: {
        es: "El ingrediente no contiene información adicional",
        en: "The ingredient does not contain additional information",
      },
      redMeat: {
        es: "Es carne roja",
        en: "It's red meat",
      },
      seafood: {
        es: "Es marisco",
        en: "It's seafood",
      },
      chicken: {
        es: "Es pollo",
        en: "It's chicken",
      },
      gluten: {
        es: "Contiene gluten",
        en: "It contains gluten",
      },
      animalOrigin: {
        es: "Es un alimento de origen animal",
        en: "It’s an animal origin ingredient",
      },
      lactose: {
        es: "Contiene lactosa",
        en: "It contains lactose",
      },
      egg: {
        es: "Contiene huevo",
        en: "Contains egg",
      },
      soy: {
        es: "Contiene soya",
        en: "Contains soy",
      },
    },
    states: {
      title: {
        es: "Estados",
        en: "States",
      },
      name: {
        es: "Nombre del estado",
        en: "State's name",
      },
      default: {
        es: "default",
        en: "default",
      },
      nutriValues: {
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
        title: {
          es: "Valor nutricional",
          en: "Nutritional value",
        },
        dailyValue: {
          es: "(Basado en una dieta diaria de 2,000 calorías)",
          en: "(Based on a 2,000 calorie daily diet)",
        },
        items: [
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
            unit: "",
            className: "nutrifact",
            dailyValue: 2400,
          },
          {
            key: "carbohydrates",
            name: {
              es: "Carbohidratos",
              en: "Carbohydrates",
            },
            unit: "gr",
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
        ],
      },
    },
    empty: {
      es: "Busca un ingrediente y selecciónalo para conocer sus detalles",
      en: "Search for an ingredient and select it to know its details",
    },
    edit: {
      es: "Editar ingrediente",
      en: "Edit ingredient",
    },
    delete: {
      es: "Eliminar ingrediente",
      en: "Delete ingredient",
    },
    deleteConfirmation: {
      es: (name) =>
        `¿Estás seguro que quieres eliminar el ingrediente "${name}"? Esta acción no puede ser revertida.`,
      en: (name) =>
        `Are you sure you want to delete the ingredient "${name}"? This action cannot be undone.`,
    },
    responses: {
      delete: {
        success: {
          es: "Eliminado con éxito.",
          en: "Successfully deleted.",
        },
        error: {
          es: "Error del servidor",
          en: "Server error",
        },
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
      states: {
        es: "Estado del ingrediente",
        en: "Ingredient state",
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
        es: "Guardar",
        en: "Save",
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
      loading: {
        es: "Cargando...",
        en: "Loading...",
      },
    },
  },
  messages: {
    succes: {},
    errors: {},
  },
};

export const viewRecipe = {
  search: {
    title: {
      es: "Buscador de recetas",
      en: "Recipe finder",
    },
    loading: {
      es: "Cargando...",
      en: "Loading...",
    },
    loadMore: {
      es: (limit) => `Cargar ${limit} más`,
      en: (limit) => `Load ${limit} more`,
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
          unit: "",
          className: "nutrifact",
          dailyValue: 2400,
        },
        {
          key: "carbohydrates",
          name: {
            es: "Carbohidratos",
            en: "Carbohydrates",
          },
          unit: "gr",
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
            es: "cdta",
            en: "tsp",
          },
          tablespoon: {
            es: "cda",
            en: "tbsp",
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
            es: "pza",
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
  loading: {
    es: "Cargando...",
    en: "Loading...",
  },
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
      videoCallLink: {
        title: { es: "Enlace de video llamada", en: "Video call link" },
        placeHolder: {
          es: "Ingresa el enlace de video llamada del administrador",
          en: "Enter the admin's video call link",
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
        options: ["CEO", "Super admin", "Developer", "Admin", "Marketing"],
      },
      lang: {
        title: {
          es: "Lenguaje que habla",
          en: "Language that he/she speaks",
        },
        options: ["es", "en"],
      },
      locked: {
        title: {
          es: "Bloquear / desbloquear perfil",
          en: "Lock / unlock profile",
        },
        true: {
          es: "Bloqueado",
          en: "Locked",
        },
        false: {
          es: "Desbloqueado",
          en: "Unlocked",
        },
      },
      availabilityRange: {
        title: {
          es: "Rango de disponibilidad",
          en: "Availability range",
        },
        days: {
          es: "Selecciona los días que uncluirá este rango",
          en: "Select the days that this range includes",
        },
        from: {
          es: "De",
          en: "From",
        },
        to: {
          es: "a",
          en: "to",
        },
        add: {
          es: "Agregar rango",
          en: "Add range",
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
      videoCallLink: {
        title: { es: "Enlace de video llamada", en: "Video call link" },
        placeHolder: {
          es: "Ingresa el enlace de video llamada del administrador",
          en: "Enter the admin's video call link",
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
        options: ["CEO", "Super admin", "Developer", "Admin", "Marketing"],
      },
      lang: {
        title: {
          es: "Lenguaje que habla",
          en: "Language that he/she speaks",
        },
        options: ["es", "en"],
      },
      availabilityRange: {
        title: {
          es: "Rango de disponibilidad",
          en: "Availability range",
        },
        days: {
          es: "Selecciona los días que uncluirá este rango",
          en: "Select the days that this range includes",
        },
        from: {
          es: "De",
          en: "From",
        },
        to: {
          es: "a",
          en: "to",
        },
        add: {
          es: "Agregar rango",
          en: "Add range",
        },
      },
      submit: {
        es: "Crear administrador",
        en: "Create admin",
      },
    },
    weekDays: [
      { key: "mon", es: "Lunes", en: "Monday" },
      { key: "tue", es: "Martes", en: "Tuesday" },
      { key: "wed", es: "Miércoles", en: "Wednesday" },
      { key: "thu", es: "Jueves", en: "Thursday" },
      { key: "fri", es: "Viernes", en: "Friday" },
      { key: "sat", es: "Sábado", en: "Saturday" },
      { key: "sun", es: "Domingo", en: "Sunday" },
    ],
  },
};

export const stats = {
  header: {
    globalUsers: {
      es: "Usuarios globales",
      en: "Global users",
    },
    usersWPayPlan: {
      es: "Usuarios con plan de pago vigente",
      en: "Users with active payment plan",
    },
    activeUsers: {
      es: "Usuarios activos esta semana",
      en: "Active users this week",
    },
    recipesCreated: {
      es: "Recetas creadas",
      en: "Created recipes",
    },
  },
  newUsers: {
    es: "Nuevos usuarios",
    en: "New users",
    toggle: [
      {
        key: "week",
        es: "Semana",
        en: "Week",
      },
      {
        key: "month",
        es: "Mes",
        en: "Month",
      },
      {
        key: "year",
        es: "Año",
        en: "Year",
      },
    ],
    months: [
      { es: "Enero", en: "January" },
      { es: "Febrero", en: "February" },
      { es: "Marzo", en: "March" },
      { es: "Abil", en: "April" },
      { es: "Mayo", en: "May" },
      { es: "Junio", en: "June" },
      { es: "Julio", en: "July" },
      { es: "Agosto", en: "August" },
      { es: "Septiembre", en: "September" },
      { es: "Octubre", en: "October" },
      { es: "Noviembre", en: "November" },
      { es: "Diciembre", en: "December" },
    ],
  },
  favoriteRecipes: {
    es: "Recetas favoritas de los usuarios",
    en: "User's favorite recipes",
  },
  usersPerGender: {
    es: "Usuarios por género",
    en: "Users per gender",
    genders: {
      male: {
        es: "Hombres",
        en: "Men",
      },
      female: {
        es: "Mujeres",
        en: "Women",
      },
      undefined: {
        es: "Indefinido",
        en: "Undefined",
      },
    },
  },
  usersPerCountry: {
    es: "Usuarios por país",
    en: "Users per country",
  },
  usersPerAgeRange: {
    es: "Usuarios por rango de edades",
    en: "Users per age range",
  },
  loading: {
    es: "Cargando...",
    en: "Loading...",
  },
};

export const adminTypes = {
  super: ["CEO", "Developer", "Super admin"],
  normal: ["Admin", "Marketing"],
  all: ["CEO", "Developer", "Super admin", "Admin", "Marketing"],
  canCreateRecipes: ["CEO", "Super admin", "Admin"],
};

export const allowedTabs = {
  ceo: [
    "Agenda",
    "CreateAd",
    "CreateEvent",
    "CreateIngredient",
    "CreateRecipe",
    "EditUser",
    "Profiles",
    "Recipe",
    "Stats",
  ],
  developer: [
    "Agenda",
    "CreateAd",
    "CreateEvent",
    "CreateIngredient",
    "CreateRecipe",
    "EditUser",
    "Profiles",
    "Recipe",
    "Stats",
  ],
  "super admin": [
    "Agenda",
    "CreateAd",
    "CreateEvent",
    "CreateIngredient",
    "CreateRecipe",
    "EditUser",
    "Profiles",
    "Recipe",
  ],
  marketing: ["CreateAd", "CreateEvent", "Stats"],
  admin: ["Agenda", "CreateIngredient", "CreateRecipe", "EditUser", "Recipe"],
};

export const defaultTab = {
  CEO: "Stats",
  Developer: "Stats",
  Marketing: "Stats",
  "Super admin": "Agenda",
  Admin: "Agenda",
};

export const agenda = {
  months: [
    { es: "Enero", en: "January" },
    { es: "Febrero", en: "February" },
    { es: "Marzo", en: "March" },
    { es: "Abril", en: "April" },
    { es: "Mayo", en: "May" },
    { es: "Junio", en: "June" },
    { es: "Julio", en: "July" },
    { es: "Agosto", en: "August" },
    { es: "Septiembre", en: "September" },
    { es: "Octubre", en: "October" },
    { es: "Noviembre", en: "November" },
    { es: "Diciembre", en: "December" },
  ],
  days: [
    { es: "Lunes", en: "Monday" },
    { es: "Martes", en: "Tuesday" },
    { es: "Miércoles", en: "Wednesday" },
    { es: "Jueves", en: "Thursday" },
    { es: "Viernes", en: "Friday" },
    { es: "Sábado", en: "Saturday" },
    { es: "Domingo", en: "Sunday" },
  ],
  monthsSection: {
    title: {
      es: "Meses",
      en: "Months",
    },
  },
  daysSection: {
    title: {
      es: "Días",
      en: "Days",
    },
    loading: {
      es: "Cargando...",
      en: "Loading...",
    },
    noSchedule: {
      es: (day, date, month, year) =>
        `No tienes horas laborales el ${day} ${date} de ${month} de ${year}`,
      en: (day, date, month, year) =>
        `You don't have working hours on ${day}, ${month} ${date} of ${year}`,
    },
  },
  appointment: {
    title: {
      es: "Cita",
      en: "Appointment",
    },
    user: {
      es: "Usuario",
      en: "User",
    },
    appointment: {
      es: "Cita",
      en: "Appointment",
    },
    date: {
      es: "Fecha de la cita",
      en: "Appointment's date",
    },
    hour: {
      es: "Hora de la cita",
      en: "Appointment's time",
    },
    phone: {
      title: {
        es: "Número telefónico",
        en: "Phone number",
      },
      empty: {
        es: "No ha registrado su número telefónico",
        en: "Has not registered his (her) phone number",
      },
    },
    appointmentNum: {
      es: "Número de cita",
      en: "Appointment number",
    },
    link: {
      es: "Link de Zoom",
      en: "Zoom link",
    },
    lastAppointment: {
      date: {
        es: "Fecha: ",
        en: "Date: ",
      },
      admin: {
        es: "Asesor: ",
        en: "Consultant: ",
      },
      title: {
        es: "Datos de la última cita",
        en: "Last appointment data",
      },
      empty: {
        es: "Nunca ha tenido una cita (esta será su primera)",
        en: "Has never had an appointment (this will be his (her)'s first one)",
      },
    },
    empty: {
      es: "Selecciona una cita",
      en: "Select an appointment",
    },
    lang: {
      es: "Idioma que habla el usuario",
      en: "Language spoken by the user",
    },
  },
  factorDate: {
    es: (day, date, month, year) => `${day} ${date} de ${month} de ${year}`,
    en: (day, date, month, year) => `${day}, ${month} ${date} of ${year}`,
  },
  langs: {
    es: {
      es: "Español",
      en: "Spanish",
    },
    en: {
      es: "Inglés",
      en: "English",
    },
  },
};

export const editUser = {
  userFinder: {
    title: {
      es: "Buscador de usuarios",
      en: "User finder",
    },
    searchPlaceholder: {
      es: "Ingresa el nombre de un usuario",
      en: "Enter a user's name",
    },
    null: {
      es: (e) => "Busca algún usuario",
      en: (e) => "Search for a user",
    },
    empty: {
      es: (userName) => `No hay usuarios llamados '${userName}'`,
      en: (userName) => `There are no users called '${userName}'`,
    },
    loading: {
      es: "Cargando...",
      en: "Loading...",
    },
  },
  userPlan: {
    title: {
      es: "Plan del usuario",
      en: "User's plan",
    },
    meals: {
      breakfast: {
        es: "Desayuno",
        en: "Breakfast",
      },
      snack1: {
        es: "Colación",
        en: "Snack",
      },
      snack2: {
        es: "Colación",
        en: "Snack",
      },
      lunch: {
        es: "Almuerzo",
        en: "Lunch",
      },
      dinner: {
        es: "Cena",
        en: "Dinner",
      },
    },
    loading: {
      es: "Cargando...",
      en: "Loading...",
    },
    switchBtn: {
      es: "Cambiar",
      en: "Switch",
    },
    add: {
      es: "Agregar",
      en: "Add",
    },
    removeRecipe: {
      es: "Remover",
      en: "Remove",
    },
    removeConfirmation: {
      es: (recipeName) =>
        `¿Estás seguro(a) de que quieres remover ${recipeName} del meal plan?`,
      en: (recipeName) =>
        `Are you sure you want to remove ${recipeName} from the meal plan?`,
    },
    settingsBtn: {
      es: "Ajustes de usuario",
      en: "User's settings",
    },
    notesBtn: {
      es: "Notas del usuario",
      en: "User's notes",
    },
    empty: {
      es: "Vacío",
      en: "Empty",
    },
    dateIsNotValid: {
      es: "La fecha seleccionada no es válida",
      en: "The selected date is not valid",
    },
  },
  recipeFinder: {
    title: {
      es: "Buscador de recetas",
      en: "Recipe finder",
    },
    searchPlaceholder: {
      es: "Ingresa el nombre de alguna receta",
      en: "Enter a recipe's name",
    },
    switchBtn: {
      es: "Cambiar",
      en: "Switch",
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
  userSettings: {
    title: {
      es: "Ajustes del usuario",
      en: "User's settings",
    },
    servings: {
      title: {
        es: "Porciones de la receta que el usuario come",
        en: "Servings of the recipe that the user eats",
      },
      saveBtn: {
        es: "Guardar cambios",
        en: "Save changes",
      },
      success: {
        es: "Cambios guardados con éxito!",
        en: "Changes saved succesfully!",
      },
    },
    exclusions: {
      title: {
        es: "Exclusiones",
        en: "Exclusions",
      },
      excludedProducts: {
        es: "productos excluidos",
        en: "excluded products",
      },
      view: {
        es: "Ver",
        en: "View",
      },
      exclusivity: {
        es: (uName) => `Exclusivo del usuario`,
        en: (uName) => `User exclusive`,
      },
      new: {
        title: {
          es: "Crear nueva exclusión",
          en: "Create new exclusion",
        },
        name: {
          placeholder: {
            es: "Ingresa el nombre de la exclusión",
            en: "Enter the exclusion name",
          },
          title: {
            es: "Nombre",
            en: "Name",
          },
        },
        ingredients: {
          es: "¿Qué ingredientes incluye la exclusión?",
          en: "What ingredients does the exclusion include?",
        },
        save: {
          es: "Crear",
          en: "Create",
        },
      },
    },
    saveBtn: {
      es: "Guardar cambios",
      en: "Save changes",
    },
  },
  notes: {
    title: {
      es: "Notas",
      en: "Notes",
    },
    inputPlaceholder: {
      es: "Ingresa una nueva nota",
      en: "Enter a new note",
    },
    createNote: {
      es: "Crear una nueva nota",
      en: "Create a new note",
    },
    createNoteBtn: {
      es: "Guardar",
      en: "Save",
    },
  },
  months: [
    { es: "Enero", en: "January" },
    { es: "Febrero", en: "February" },
    { es: "Marzo", en: "March" },
    { es: "Abril", en: "April" },
    { es: "Mayo", en: "May" },
    { es: "Junio", en: "June" },
    { es: "Julio", en: "July" },
    { es: "Agosto", en: "August" },
    { es: "Septiembre", en: "September" },
    { es: "Octubre", en: "October" },
    { es: "Noviembre", en: "November" },
    { es: "Diciembre", en: "December" },
  ],
  days: [
    { es: "Lunes", en: "Monday" },
    { es: "Martes", en: "Tuesday" },
    { es: "Miércoles", en: "Wednesday" },
    { es: "Jueves", en: "Thursday" },
    { es: "Viernes", en: "Friday" },
    { es: "Sábado", en: "Saturday" },
    { es: "Domingo", en: "Sunday" },
  ],
  factorDate: {
    es: (day, date, month, year) => `${day} ${date} de ${month} de ${year}`,
    en: (day, date, month, year) => `${day}, ${month} ${date} of ${year}`,
  },
  responses: {
    creation: {
      success: {
        es: "¡Creado con éxito!",
        en: "Successfully created!",
      },
      invalidInputs: {
        es: "Datos ingresados no válidos",
        en: "Invalid inputs",
      },
    },
    update: {
      success: {
        es: "¡Actualizado con éxito!",
        en: "Successfully updated!",
      },
      fail: {
        es: "Error del servidor",
        en: "Server error",
      },
    },
  },
};

export const categoryNames = {
  accompaniments: {
    es: "Acompañamientos",
    en: "Side dishes",
  },
  breakfasts: {
    es: "Desayunos",
    en: "Breakfasts",
  },
  dinners: {
    es: "Cenas",
    en: "Dinners",
  },
  lunches: {
    es: "Comidas",
    en: "Lunches",
  },
  snacks: {
    es: "Snacks",
    en: "Snacks",
  },
};
