const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//Crea una nueva Tarea
exports.crearTarea = async (req, res) => {

   //Revisa si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
       return res.status(400).json({errores: errores.array()});
   }

   try {
    
    //Extraer el proyecto y ver si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if(!existeProyecto){
        return res.status(404).json({msg: 'Proyecto no encontrado'});
    }

    //Verificar el creador del proyecto
    if(existeProyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No autorizado'})
     }

    //Se crea la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({tarea})
    
   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }

}

//Obtiene tareas
exports.obtenerTareas = async (req, res) => {
    try {
        //Extraer el proyecto y ver si existe
        const { proyecto } = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Obtener tareas por proyecto
        const tareas = await Tarea.find({proyecto}).sort({creado: -1});
        res.json({tareas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualiza una tarea
exports.actualizarTarea = async (req, res) => {
    try {
        //Extraer el proyecto y ver si existe
        const { proyecto, nombre, estado } = req.body;

        //Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id)

        if (!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //Estraer tarea
        const existeProyecto = await Proyecto.findById(proyecto);

        //Verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Se crea un objeto con nueva información
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;
        
        //Guardar tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
        
        res.json({tarea});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        //Extraer el proyecto y ver si existe
        const { proyecto } = req.query;

        //Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id)

        if (!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //Estraer tarea
        const existeProyecto = await Proyecto.findById(proyecto);

        //Verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Eliminar tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}