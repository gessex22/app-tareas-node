// const { menu, pausa } = require('./helpers/mensajes');

const { inquirermenu,pausa,readinput, deleteTasklist, confirmacion, completedtask } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveDB');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');



require('colors');



 console.clear();

const main = async () =>
{
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = readDB();

    if (tareasDB !== null){
        console.log(tareasDB);
        tareas.loadTaskFromArray(tareasDB);
    }await pausa();

    do {
        console.clear();
        opt = await inquirermenu();

        switch (opt) {
            case "1":
                const desc = await readinput('Descripcion:');
                tareas.CrearTarea(desc);
                break;
            case "2":
                console.log(tareas.listAll());
                break;
            case "3":
                console.log(tareas.listCompleted());
                break;
            case "4":
                console.log(tareas.listPending());
                break;
            case "5":
                const ids = await completedtask(tareas.listadoArr);
                tareas.togglesCompletadas(ids);
                console.log(ids);
                break;
            case "6":
                const id = await deleteTasklist(tareas.listadoArr);
                if (id !== '0')
                {
                    const ok = await confirmacion("Esta seguro de eliminar esta tarea?");
                    if (ok)
                    {
                    tareas.BorrarTarea(id);
                    }
                }
                
                break;    
            
        }

        saveDB(tareas.listadoArr);

        console.log(`\n`);

        if (opt !== "0")
        {
            await pausa();
        }
        // const tareas = new Tareas();
        // const tarea = new Tarea("Prueba de funcionamiento");
        // tareas._listado[tarea.id]= tarea;
        // console.log(tareas);
        
    } while (opt !== '0')
   
}

main();