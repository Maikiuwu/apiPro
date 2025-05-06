import { readData, writeData } from '../utils/fileUtils.js';

//Añade un intento al historial.
async function addAttempt(attempt) {
  const db = await readData();
  db.attempts.push(attempt);
  await writeData(db);
  return attempt;
}

//Recupera todos los intentos.
async function getAllAttempts() {
  const db = await readData();
  return db.attempts;
}

export {addAttempt, getAllAttempts};
