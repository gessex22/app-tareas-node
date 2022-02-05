require('colors');


const menu = () =>{

    return new Promise ((resolve) =>{

    console.log(`========================`.green);
    console.log(`========================`.green);
    console.log(`    Tareas 1.0 G         `.red);
    console.log(`========================`.green);
    console.log(`========================\n`.green);


    console.log(`Menu de tareas:`.magenta);
    console.log(`1. Crear tarea`);
    console.log(`2. Listar tareas`);
    console.log(`3. Listar tarea completadas`);
    console.log(`4. Listar tareas pendientes`);
    console.log(`5. Completar tarea(s)`);
    console.log(`6. Borrar tarea`);
    console.log(`0. Salir\n`);

    const  rewr = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rewr.question(`Seleccione una de las opciones \n`, (opt)=>{

        console.log({opt});
        rewr.close();
        resolve(opt);
    });
    
    });




}

const pausa = () => {

    return new Promise((resolve)=>{

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\n Presione ${'Enter'.green} para continuar`, (opt)=>{
            readline.close();
            resolve(opt);
        });

    })
    

    
}

module.exports = {
    menu,
    pausa
}