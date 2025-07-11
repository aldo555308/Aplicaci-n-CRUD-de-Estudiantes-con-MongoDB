const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://aldoyamil30:8voQBrs23lvLEb6r@cluster0.iyfx4xm.mongodb.net/estudiantes?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Rutas
const estudianteRoutes = require('./routes/estudiante.routes');
app.use('/api/estudiantes', estudianteRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
