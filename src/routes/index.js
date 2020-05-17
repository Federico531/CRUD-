const express = require('express');
const router = express.Router(); //metodo enrutador de express
//almacenamos lo que devuelve

const Task = require('../models/tasks'); //importo el esquema Task

//Cuando requerimos la ruta inicial automaticamente nos mostrara la vista de index
//Estoy solicitando de la coleccion task todos los objetos 
router.get('/', async (req,res)=>{
    const tasks= await Task.find(); //aca le decimos que responda la vista de /views/index.ejs  
    console.log(tasks)
    res.render('index', { //lo envio a la vista de index.ejs      
        tasks //esta es la la coleccion que exporte desde el archivo model tasks
    });  //le devuelvo la respuesta al
});

//Recibo los datos que vienen desde el formulario en index ejs
router.post('/add',async (req,res)=>{ 
    const task = new Task(req.body); 
    //req.body es lo que nos envia el usuario y lo metemos dentro del esquema Task
    await task.save() //guardo lo que me devuelve
    res.redirect('/'); //luego de guardar redirecciona a esta ruta
});


router.get('/delete/:id',async (req,res)=>{ //tiene que ser :id o no funca?
    //:loquesea le dice que hay una especie de variable (nro de objeto en este caso)
    const {id} = req.params; //esta constante va a ser el id que viene de req.params
    // console.log(req.params.id)
    await Task.remove({_id: id}); //esto va a remover de la coleccion task un elemento que concuerde con este id
    //Task (importado).borrarde labase({buscar por _id : id que nos devuelve el req.params})
    res.redirect('/'); //luego de Borrar redirecciona a esta ruta
}) 


router.get('/turn/:id', async (req,res)=>{
    const {id} = req.params; //recibo los parametros del id del objeto 
    const task = await Task.findById(id); //con ese id busco el objeto especifico y lo guardo
    task.status = !task.status; //si estaba false colocando el contrario va a estar en true y viceceersa
    await task.save(); //guardo la accion 
    res.redirect('/') //refresco
})

//asi podemos desplegar una nueva pagina con un nuevo render 

router.get('/edit/:id', async(req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit',{
        task   //coleccion tarea que hemos renderizado desde la base de datos
    })  //nos muestra un formulario nuevo para editar 
})

router.post('/edit/:id',async (req,res)=>{ 
    const {id} = req.params; 
    await Task.update({_id: id},req.body); //el segundo parametro es el que estamos actualizando
    res.redirect('/');
});
module.exports = router; //exporto para que otras carpetas lo requieran