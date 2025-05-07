import fs from 'fs/promises'
import path from 'path'

const DB_PATH = path.resolve('src/db', 'dbPokemon.json')

// Lee y parsea el JSON de almacenamiento.

export async function readData () {
  try {
    const content = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(content)
  } catch (err) {
    console.error('Error reading DB file:', err)
    return { attempts: [] }
  }
}

// Serializa y escribe datos en el JSON de almacenamiento.

export async function writeData (data) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing DB file:', err)
  }
}
