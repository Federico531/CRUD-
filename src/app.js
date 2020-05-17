const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//Connecting to DB

mongoose.connect('mongodb://localhost/crud-mongo') //conexion del localhost a la base de datos
.then(res => console.log('Data Base Connected'))  
.catch(err => console.log(err)) 

//Importing Routes
const indexRoutes = require('./routes/index'); //importo las rutas que van a ejecutarse en el inicio de la pagina
//Settings
app.set('port', process.env.PORT || 3000);   //app.define('un puerto') 
                                             //process.env.PORT = que tome el puerto del sistema operativo


//Hace que la carpeta views sea visible para el resto de los archivos en otras carpetas
//seria como importar views en si                                              
app.set('views', path.join(__dirname + '/views')); //la carpeta views esta conaca 


app.set('view engine', 'ejs'); //lo requerimos asi de simple porque express ya conoce el motor


                                    
//Middlewares //funciones que se ejecutan antes de las rutas //darle permiso que vaya a una ruta o no, alterar datos

app.use(morgan('dev'));  
app.use(express.urlencoded({extended: false})); //extended: true --> para archivos pesados

 

//cada vez que un usuario inserta datos y me los envia al servidor
//morgan nos devuelve un mensaje por consola si algo sucede entre el navegador y el servidor (para saber que pide el cliente)

//Routes
app.use('/', indexRoutes) //cada vez que un usuario entre a mi ruta inicial vamos a utilizar estas rutas

//Starting the server

app.listen(app.get('port'),()=>{   
    console.log(`Server on port ${app.get('port')}` );
})