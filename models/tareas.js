const { green, blue } = require("colors");
const Tarea = require("./tarea");

class Tareas{

   _listado = {};


   get listadoArr () {

    const listado = [];
    Object.keys(this._listado).forEach( keys => {
        const tarea = this._listado[keys];
        listado.push(tarea);
    })
    return listado;
   }

    constructor(){
        this._listado = {}
    
    }
    
    BorrarTarea (id ="") {

        if (this._listado[id]){
             delete this._listado[id];
        }

    }

    CrearTarea(desc = ""){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    loadTaskFromArray ( tasks = []) {

       tasks.forEach(tarea => {

            this._listado[tarea.id] = tarea;
       })
    }

    listCompleted()
    {

        let salida = '';
        let contador = 1
        this.listadoArr.forEach( (tarea,i) =>{

            if(tarea.completadoEn !== null ){

                salida += `${contador}.`.blue + ` ${tarea.desc} :: ${tarea.completadoEn }\n`;
                contador++;
            }

        })
        return salida;       
    }
    
    listPending()
    {
        let salida = '';
        let contador = 1;
        this.listadoArr.forEach( (tarea) =>{

            if(tarea.completadoEn == null ){

                salida += `${contador}.`.blue + ` ${tarea.desc} \n`;
                contador++;
            }

        })
        return salida;
        // let completado = [];
        // return completado = this.listadoArr.filter(task => task.completadoEn !== null)
       
    }
    togglesCompletadas (ids = []){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea =>{

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }


    listAll(){

        let salida = '';
        this.listadoArr.forEach( (tarea,i) =>{

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn !== null) ? 'Completada'.green : 'Pendiente'.red;
            salida += `${i}.`.blue + ` ${desc} :: ${estado} \n`;

        })
        return salida;
    }
}





module.exports =Tareas;