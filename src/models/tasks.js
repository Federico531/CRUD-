const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    tittle: String, 
    description: String, 
    status: {
        type: Boolean,
        default: false
    }
})

//cambiando este task por el nombre de otra coleccion se despliega la otra 
module.exports = mongoose.model('task',TaskSchema); // "nombre de la coleccion" , documento 