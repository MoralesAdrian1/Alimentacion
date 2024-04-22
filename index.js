const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//routes admin
const alimentoRoutes=require('./routes/alimentos');
const categoriaRoutes = require('./routes/categorias');
const consumoRoutes= require('./routes/consumo')
//settings

app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Agrega morgan para registrar las solicitudes

//inicializar routes
app.use('/api',alimentoRoutes);
app.use('/api',categoriaRoutes);
app.use('/api',consumoRoutes);


//static file


//start server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
