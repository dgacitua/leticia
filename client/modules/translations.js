const translations = {
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
        submitButton: "Enviar respuesta"
      },
      taskDescription: {
        nextStageButton: "Continuar"
      },
      taskForm: {
        instructions: "Respecto a la tarea asignada, responde las siguientes preguntas:",
        submitButtton: "Enviar respuesta"
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
        submitButtton: "Enviar respuesta"
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
      submitButtton: "Enviar respuesta",
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
      submitButtton: "Enviar respuesta"
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
      submitButtton: "Enviar respuesta"
    },
    typingTest: {
      titleInstructions: "Instrucciones test de escritura",
      title: "Test de Escritura",
      instructions: [
        "En la siguiente prueba relizarás un test de escritura.",
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