export const bookPrompts = {
    sinopsis: (genre: any, theme: any) => `
      Crea una sinopsis original para un libro de ${genre} sobre ${theme}
      Elementos:
      - Premisa única
      - Conflicto central
      - Potencial gancho narrativo
    `,
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
    `
  }
  
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
  