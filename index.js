const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Creación del servidor
const app = express();

//Conectar a la BBDD
conectarDB();

app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}));

//Creación del puerto
const PORT = process.env.PORT || 4000;

//Importación de rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Definir pagina principal
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

//Prendiendo el servidor
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);   
});