// https://expressjs.com/es/
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";


import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import ventaRoutes from "./routes/ventaRoutes.js";

const PORT = process.env.PORT || 4000;

dotenv.config();

// Se le agrega toda la funcionalidad del servidor de express
const app = express();
app.use(express.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:"./files"
}));
conectarDB();

// middlewares
// Se utiliza para realizar la comunicacion entre el servidor del frontend y el backend
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {

  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El origen del Request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions)); 

//gestion de usuario
app.use("/api/usuarios", usuarioRoutes);

// gestion de productos
app.use("/api/productos", productoRoutes);

// gestion de ventas
app.use("/api/ventas", ventaRoutes);


app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT} `);
});
