export const bookPrompts = {
  sinopsis: () => `En el vibrante mundo de la arqueología, el Dr. Ethan James descubre un artefacto antiguo que desentraña un secreto mortal: un hechizo que amenaza con romper el tejido mismo de la realidad. En un giro del destino, el hechizo se une inexorablemente a una joven e ingeniosa periodista, Anya Petrova, que queda atrapada en una carrera a contrarreloj para salvar el mundo. El romance florece entre Ethan y Anya mientras luchan juntos contra las fuerzas oscuras que intentan apoderarse del hechizo. Sin embargo, su vínculo está plagado de conflictos: Ethan, atormentado por su pasado misterioso, lucha por abrirse, mientras que Anya, impulsada por su determinación de descubrir la verdad, pone en riesgo imprudentemente su propia seguridad. Cuando el hechizo se vuelve cada vez más poderoso, amenazando con consumir a Anya, Ethan debe confrontar sus demonios y superar sus miedos. Juntos, deben navegar por un laberinto de secretos, traiciones y viajes sobrenaturales para desentrañar el misterio del artefacto y romper la maldición que los une, todo ello mientras sucumben a la irresistible atracción que amenaza con destruirlos a ambos`,
  personaje: (archetype: any) => `
    Desarrolla un personaje con arquetipo: ${archetype}
    Detalles:
    - Nombre completo
    - Historia personal
    - Motivaciones profundas
    - Conflictos internos
  `,
  escena: (genre: any, setting: any) => `
    Escribe una escena de ${genre} en ${setting}
    Instrucciones:
    - Descripción atmosférica
    - Diálogos naturales
    - Revelación de tensiones
  `,
  recomendacion: (genre: any, theme: any, author: any) =>  {
    return `
    Recomienda 5 libros basados en los siguientes criterios, sin utilizar etiquetas html:
    - Género: ${genre}
    - Tema: ${theme}
    - Preferencia de autor: ${author}
    La respuesta solo debe estar en texto plano, sin etiquetas HTML.
    El formato de la respuesta debe ser una lista, con la siguiente estructura para cada libro: \n
    Titulo: [Titulo del libro] \n
    Autor: [Nombre del autor] \n
    Descripcion: [Breve descripcion del libro] \n
    Cada uno de los campos debe estar en una nueva linea
  `},
};

export const Chatbox = async (type: any, params: any) => {
  try {
    const response = await fetch('/api/generate-book-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type, params })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al generar contenido del libro:', error)
    throw error
  }
}
