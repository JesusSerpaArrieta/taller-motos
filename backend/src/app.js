const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "API del Taller de Motos 🏍️" });
});

app.listen(3000, () => {
  console.log('Backend corriendo en http://localhost:3000');
});