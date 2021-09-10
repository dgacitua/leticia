const translations = {
  en: {
    oauth: {
      title: "To start, login with an account",
      disclaimer: "LETICIA only registers the associated email of the selected account, no other personal data is stored.",
      googleLogin: "Register with Google",
      facebookLogin: "Register with Facebook",
      register: "Register with Email",
      login: "Login with Email",
      backButton: "Go back"
    },
    emailAuth: {
      loginTitle: "Login in LETICIA",
      registerTitle: "Register in LETICIA",
      email: "Email",
      password: "Password",
      submitLogin: "Login",
      submitRegister: "Register"
    },
    formElements: {
      addQuery: "Add another query"
    },
    userHub: {
      title: "User panel",
      completedPerc: "Percentage of challenge completed",
      completedBar: "{0} completed",
      goButton: "Go to test"
    },
    queryPlanning: {
      instructions: {
        title: "Challenge instructions",
        goButton: "Go to challenge"
      },
      queryWriter: {
        submitButton: "Submit answer"
      },
      taskDescription: {
        nextStageButton: "Continue"
      },
      taskForm: {
        instructions: "Regarding the assigned task, answer the following questions:",
        submitButtton: "Submit answer"
      },
      taskReady: {
        instructions: "Next you will be presented with a search task. Read it carefully and do the indicated activities. When you are ready, press Next to continue.",
        nextStageButton: "Next"
      }
    },
    search: {
      displayPage: {
        message: "The page cannot be displayed "
      },
      instructions: {
        title: "Challenge instructions",
        continueButton: "Continue",
        text: [
          "Next you will be presented with a search engine in which you can make queries and search for suitable documents to solve the information need on the prompted task.",
          "You must bookmark {numDocs} or more documents that are relevant to solve the task (take into account factors such as the reliability of the source and content quality).",
          "To bookmark or unbookmark documents, enter to the document from the search results page and use the Bookmark/Unbookmark document buttons from the top bar.",
          "To return to the search engine, use the back button on the top bar.",
          "When you have {numDocs} or more documents marked, you can end the search with the button \"End search\" in the top bar.",
        ]
      },
      searchModule: {
        searchButton: "Search",
        noResultsFound: "No search results found",
        loadingMessage: "Loading..."
      },
      taskDescription: {
        continueButton: "Continue"
      },
      taskForm: {
        instructions: "Regarding the assigned task, answer the following questions:",
        submitButtton: "Submit answer"
      },
      taskReady: {
        instructions: "Next wou will be presented with a search task. Read it carefully and complete the indicated activities. When you are ready, press Next to continue.",
        nextStageButton: "Next"
      }
    },
    demographic: {
      title: "Demographic Questionnaire",
      sex: "Sex",
      age: "Age",
      ageHint: "Current age (in years)",
      handedness: "What is your dominant hand when writing?",
      nativeLanguage: "What is your native language?",
      nativeLanguageCustom: "Please indicate your native language",
      keyboardLayout: "What is your keyboard layout?",
      keyboardLayoutCustom: "Please indicate your keyboard layout",
      searchEngine: "What is your preferred web search engine?",
      searchEngineCustom: "Please indicate your preferred web search engine",
      education: "Educational level",
      educationHint: "Please indicate your last completed level or in in progress",
      career: "Career",
      careerHint: "(OPTIONAL) In case of indicating Technical-Professional or University educational level, indicate the career in progress or finished",
      isStudent: "Are you studying now?",
      hasDyslexia: "Do you have Dyslexia?",
      hasColorBlindness: "Do you have any type of color blindness?",
      country: "Country of residence",
      region: "Región/State/Province of residence",
      city: "City of residence",
      town: "Town of residence",
      townHint: "(OPTIONAL)",
      submitButtton: "Submit answer",
      options: {
        common: {
          yes: "Yes",
          no: "No",
          other: "Other",
          dontKnow: "I don't know",
          noneOfTheAbove: "None of the above"
        },
        sex: {
          male: "Male",
          female: "Female"
        },
        language: {
          english: "English",
          spanish: "Spanish"
        },
        handedness: {
          right: "Right",
          left: "Left",
          both: "Both"
        },
        keyboardLayout:{
          spanishLatin: "Spanish (Latin America)",
          spanishSpain: "Spanish (Spain)",
          english: "English"
        },
        educationLevel: {
          elementary: "Elementary School",
          high: "High School",
          professional: "Technical-Professional",
          undergraduate: "University (Undergraduate)",
          masters: "University (Masters)",
          phd: "University (PhD)"
        },
        isStudent: {
          yes: "Si, I'm a student",
          no: "No, I've graduated already"
        }
      }
    },
    exitSurvey: {
      title: "Exit survey",
      instructions: "Answer the following questions related to your experience with the LETICIA platform",
      submitButtton: "Submit answer"
    },
    stroopTest: {
      instructions: [
        "In this test, you'll see names of colors (yellow, blue, pink, orange, red, green) printed in different colors",
        "The objective of this test is to detect if the color name matches the printed color",
        "For example, if you see:",
        "GREEN",
        "You must press the \"No\" button because the color name (green) does not match the printed color (red).",
        "On the other hand, if you see:",
        "BLUE",
        "You must press the \"Yes\" button because the color name and the printed color match (blue).",
        "Try to answer as fastest as possible this test. Once you are ready to start, press the \"Go to test\" button."
      ],
      textColors: [ 'YELLOW', 'BLUE', 'PINK', 'ORANGE', 'RED', 'GREEN' ],
      skipInstructionsButton: 'Go to test',
      matchQuestion: "Does the color name matches the printed color?",
      yes: "Yes",
      no: "No"
    },
    taskLoadIndex: {
      title: "Task Load Survey",
      instructions: "Answer the following questions based on the task that you just performed",
      submitButtton: "Submit answer"
    },
    typingTest: {
      titleInstructions: "Typing test instructions",
      title: "Typing test",
      instructions: [
        "Next wou will be presented with a typing test.",
        "Type every text snippet you seen on the text field exactly as it is written.",
        "Use your natural speed test, don't speed up.",
        "Press Enter or Next to coninue with the next test."
      ],
      nextStageButton: "Go to test",
      completedBar: "{0} completed",
      nextButton: "Next",
      finishButton: "Finish"
    },
    end: {
      message: "Thank you for participating!"
    },
    home: {
      title: "Welcome to LETICIA!",
      subtitle: "simuLatEd Task and actIvity Capture Interactive plAtform",
      considerations: "Conisderations to participate",
      participate: "Participate in the study"
    },
    informedConsent: {
      title: "Informed consent",
      instructions1: "To participate in this study, you must read the following informed consent.",
      instructions2: "If you agree with the informed consent, enter your data and press Continue to participate in the study.",
      fullName: "Full name",
      email: "Contact email",
      acceptance: "I agree to participate in the study",
      backButton: "Go back",
      continueButton: "Continue"
    },
    instructions: {
      title: "Challenge instructions",
      continueButton: "Go to challenge"
    },
    navbar: {
      backButton: "Go Back",
      currentTask: "Current task",
      bookmark: "Bookmark",
      unbookmark: "Unbookmark",
      finishSearch: "Finish search"
    },
    notFound: {
      message: "Page not found"
    },
    profile: {
      title: "Profile",
      token: "Access token",
      id: "Id",
      email: "Email",
      roles: "Roles"
    }
  },
  es: {
    oauth: {
      title: "Para comenzar, inicia sesión con alguna cuenta",
      disclaimer: "LETICIA registrará únicamente el correo electrónico de la cuenta utlizada. No se almacenarán otros datos personales.",
      googleLogin: "Registrarse con Google",
      facebookLogin: "Registrarse con Facebook",
      register: "Registrarse con Correo Electrónico",
      login: "Ingresar con Correo Electrónico",
      backButton: "Volver"
    },
    emailAuth: {
      loginTitle: "Iniciar sesión en LETICIA",
      registerTitle: "Registrarse en LETICIA",
      email: "Correo electrónico",
      password: "Contraseña",
      submitLogin: "Iniciar sesión",
      submitRegister: "Registrarse"
    },
    formElements: {
      addQuery: "Ingresar otra consulta"
    },
    userHub: {
      title: "Panel del usuario",
      completedPerc: "Porcentaje del desafío completado",
      completedBar: "{0} completado",
      goButton: "Ir a la prueba"
    },
    queryPlanning: {
      instructions: {
        title: "Instrucciones del desafío",
        goButton: "Ir al desafío"
      },
      queryWriter: {
        submitButton: "Submit answer"
      },
      taskDescription: {
        nextStageButton: "Continuar"
      },
      taskForm: {
        instructions: "Respecto a la tarea asignada, responde las siguientes preguntas:",
        submitButtton: "Submit answer"
      },
      taskReady: {
        instructions: "A continuación se te presentará una tarea de búsqueda. Léela con atención y realiza las actividades indicadas. Cuando estés listo(a), presiona Siguiente para continuar.",
        nextStageButton: "Siguiente"
      }
    },
    search: {
      displayPage: {
        message: "No se puede mostrar la página"
      },
      instructions: {
        title: "Instrucciones del desafío",
        continueButton: "Continuar",
        text: [
          "A continuación se te habilitará un motor de búsqueda en el cual podrás relizar consultas y buscar documentos (páginas web) adecuados para resolver la necesidad de información de la tarea indicada.",
          "Debes marcar {numDocs} o más documentos que sean relevantes para resolver la tarea (toma en cuenta factores como lo confiable que es la fuente y la calidad del contenido).",
          "Para marcar o desmarcar documentos, ingresa al documento desde la lista de resultados de búsqueda y utiliza los botones de marcar/desmarcar documento en la barra superior.",
          "Para volver al motor de búsqueda, utiliza el botón atrás en la barra superior.",
          "Cuando tengas {numDocs} o más documentos marcados, puedes terminar la búsqueda con el botón \"Terminar búsqueda\" en la barra superior.",
        ]
      },
      searchModule: {
        searchButton: "Buscar",
        noResultsFound: "No se han encontrado resultados de búsqueda",
        loadingMessage: "Cargando..."
      },
      taskDescription: {
        continueButton: "Continuar"
      },
      taskForm: {
        instructions: "Respecto a la tarea asignada, responde las siguientes preguntas:",
        submitButtton: "Submit answer"
      },
      taskReady: {
        instructions: "A continuación se te presentará una tarea de búsqueda. Léela con atención y realiza las actividades indicadas. Cuando estés listo(a), presiona Siguiente para continuar.",
        nextStageButton: "Siguiente"
      }
    },
    demographic: {
      title: "Cuestionario Demográfico",
      sex: "Sexo",
      age: "Edad",
      ageHint: "Edad actual (en años)",
      handedness: "¿Cúal es su mano dominante al escribir?",
      nativeLanguage: "¿Cúal es su idioma nativo?",
      nativeLanguageCustom: "Indique su idioma nativo",
      keyboardLayout: "¿Cúal es la distribución de su teclado?",
      keyboardLayoutCustom: "Indique su distribución de teclado",
      searchEngine: "¿Cuál es su motor de búsqueda web preferido?",
      searchEngineCustom: "Indique su motor de búsqueda web preferido",
      education: "Nivel Educacional",
      educationHint: "Indicar último nivel cursado o en curso",
      career: "Carrera",
      careerHint: "(OPCIONAL) En caso de indicar nivel educacional Técnico-Profesional o Universitario, indicar la carrera en curso o cursada",
      isStudent: "¿Está estudiando ahora?",
      hasDyslexia: "¿Usted tiene Dislexia?",
      hasColorBlindness: "¿Usted tiene algún tipo de Daltonismo?",
      country: "País de residencia",
      region: "Región/Estado/Provincia/Departamento de residencia",
      city: "Ciudad/Comuna de residencia",
      town: "Villa/Población de residencia",
      townHint: "(OPCIONAL)",
      submitButtton: "Submit answer",
      options: {
        common: {
          yes: "Si",
          no: "No",
          other: "Otro",
          dontKnow: "No lo sé",
          noneOfTheAbove: "Ninguno de los anteriores"
        },
        sex: {
          male: "Masculino",
          female: "Femenino"
        },
        language: {
          english: "Inglés",
          spanish: "Español"
        },
        handedness: {
          right: "Diestro",
          left: "Zurdo",
          both: "Ambidiestro"
        },
        keyboardLayout:{
          spanishLatin: "Español (Latinoamérica)",
          spanishSpain: "Español (España)",
          english: "Inglés"
        },
        educationLevel: {
          elementary: "Enseñanza Básica/Primaria",
          high: "Enseñanza Media/Secundaria",
          professional: "Enseñanza Técnico-Profesional",
          undergraduate: "Enseñanza Universitaria (Pregrado)",
          masters: "Enseñanza Universitaria (Magíster)",
          phd: "Enseñanza Universitaria (Doctorado)"
        },
        isStudent: {
          yes: "Si, soy estudiante",
          no: "No, ya egresé"
        }
      }
    },
    exitSurvey: {
      title: "Encuesta de Salida",
      instructions: "Contesta la(s) siguiente(s) pregunta(s) acerca de tu experiencia en la plataforma LETICIA",
      submitButtton: "Submit answer"
    },
    stroopTest: {
      instructions: [
        'En esta prueba, verás nombres de colores (amarillo, azul, rosa, naranja, rojo, verde) impresos en diferentes colores.',
        'El objetivo de esta prueba es detectar si el nombre del color coincide con el color en el cual está impreso.',
        'Por ejemplo, si ves:',
        'VERDE',
        'Debes presionar el botón "No", ya que el nombre del color (verde) no coincide con el color impreso (rojo).',
        'Por otro lado, si ves:',
        'AZUL',
        'Debes presionar el botón "Si", ya que el nombre del color y el color impreso coinciden (azul).',
        'Intenta responder lo más rápidamente posible esta prueba. Una vez que estés listo(a) para empezar, presiona el botón "Ir a la prueba".'
      ],
      textColors: [ 'AMARILLO', 'AZUL', 'ROSA', 'NARANJA', 'ROJO', 'VERDE' ],
      skipInstructionsButton: 'Ir a la prueba',
      matchQuestion: "¿El texto coincide con el color?",
      yes: "Si",
      no: "No"
    },
    taskLoadIndex: {
      title: "Encuesta de Carga de Trabajo",
      instructions: "Contesta las siguientes preguntas acerca de tu experiencia en la tarea de búsqueda que acabas de realizar",
      submitButtton: "Submit answer"
    },
    typingTest: {
      titleInstructions: "Instrucciones test de escritura",
      title: "Test de Escritura",
      instructions: [
        "En la siguiente prueba realizarás un test de escritura.",
        "Tipea cada extracto de texto que veas en el campo de texto tal cual como está escrito.",
        "Usa tu velocidad de tipeo natural, no te aceleres.",
        "Presiona Enter o Siguiente para continuar con el siguiente texto."
      ],
      nextStageButton: "Ir al test",
      completedBar: "{0} completado",
      nextButton: "Siguiente",
      finishButton: "Finalizar"
    },
    end: {
      message: "¡Gracias por participar!"
    },
    home: {
      title: "¡Bienvenido(a) a LETICIA!",
      subtitle: "simuLatEd Task and actIvity Capture Interactive plAtform",
      considerations: "Consideraciones para participar",
      participate: "Participar en el estudio"
    },
    informedConsent: {
      title: "Consentimiento Informado",
      instructions1: "Para participar de este estudio, debes leer el siguiente consentimiento informado.",
      instructions2: "Si estás de acuerdo con el Consentimiento Informado, ingresa los datos y pulsa Continuar para participar en el estudio.",
      fullName: "Nombre Completo",
      email: "Correo electrónico de contacto",
      acceptance: "Acepto participar en el estudio",
      backButton: "Volver",
      continueButton: "Continuar"
    },
    instructions: {
      title: "Instrucciones del desafío",
      continueButton: "Ir al desafío"
    },
    navbar: {
      backButton: "Atrás",
      currentTask: "Tarea actual",
      bookmark: "Marcar documento",
      unbookmark: "Desmarcar documento",
      finishSearch: "Terminar búsqueda"
    },
    notFound: {
      message: "Página no encontrada"
    },
    profile: {
      title: "Perfil",
      token: "Token de acceso",
      id: "Id",
      email: "Correo electrónico",
      roles: "Roles"
    }
  }
};

export { translations };