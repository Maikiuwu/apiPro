import express from 'express';
import bodyParser from 'body-parser';
import pokemonRoutes from './routes/pokemonRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());    
app.use(bodyParser.json());

// Montar rutas de Pokémon
app.use('/', pokemonRoutes);

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});
