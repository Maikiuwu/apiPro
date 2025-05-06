import express from 'express';
import fs, { read } from 'fs';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { get } from 'http';

const app = express();
app.use(bodyParser.json());

// Paths
const DB_PATH = './dbPokemon.json';

let pokemonParaBuscar = null;
let lastPokemon = null;
let arrLastPokemon = [];

//Read JSON database
function readData() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (err) {
    console.error('Error reading file:', err);
    return { attempts: [] };
  }
}

//Write JSON database
function writeData(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

// Fetch from PokéAPI
async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    return res.status(502).json({ error: 'Error al llamar a la PokéAPI' });
  }
  const data = await response.json();
  //reorna un objeto con los datos del pokemon
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map(t => t.type.name),
  };
}

// Generate random Pokémon
app.get('/generatePokemon', async (req, res) => {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const pokemon = await fetchPokemon(randomId);
    lastPokemon = pokemon;
    pokemonParaBuscar = pokemon;
    res.json(pokemon);
  } catch (error) {
    console.error('Error generando el pokemon:', error);
    res.status(500).json({ error: 'No se pudo obtener el Pokémon' });
  }
});

// intentar adivinar el pokemon
app.get('/guess/:name', (req, res) => {
  const guess = req.params.name.toLowerCase();
  if (!pokemonParaBuscar) {
    return console.error('Error generando el pokemon:', error);
  }
  const correct = (guess === pokemonParaBuscar.name.toLowerCase());
  res.json({ correct, pokemonActual: pokemonParaBuscar.name });
});

// historial de intentos
app.put('/pokemon/intentos', (req, res) => {
  const data = readData();
});

// Get all attempts
app.get('/pokemon/intentos', (req, res) => {
    const data = readData();
});

app.listen(3000, () => console.log('Server running on port 3000'));




















app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


/*
const readData = () => {
    try {
        const data = fs.readFileSync('./db.json');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading file:', err);
        return null;
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    }
    catch (error) {
        console.error('Erro r reading file:', error);
        return null;
    }
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/books', (req, res) => {
    const data = readData();
    res.json(data.books);
});

app.get('/books/:id', (req, res) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const book = data.books.find((book) => book.id === id);
        res.json(book);

    } catch (error) {
        console.error('Error xd:', error);
    }
});

app.post('/books', (req, res) => {
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

//acctualizar un libro
app.put('/books/:id', (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);

    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body
    };

    writeData(data);
    res.json({message:"libro actualizado pa"},data.books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);

    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({message:"libro eliminado pa"});
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
*/

