const inquirer = require('inquirer');
const Tarea = require('../models/tarea');
require('colors');

const questions = [
    {
        type: "list",
        name: "opcion",
        message: "¿Que vas hacer?",
        choices: [
        {
            name: `${"1.".green} Crear Tarea`,
            value: "1",
        },
        {
            name: `${"2.".green} Listar tareas`,
            value: "2"
        },
        {
            name: `${"3.".green} Listar tareas completadas`,
            value: "3",
        },
        {
            name: `${"4.".green} Listar tareas pendientes`,
            value: "4",
        },
        {
            name: `${"5.".green} Completar tareas`,
            value: "5",
        },
        {
            name: `${"6.".green} Borrar tareas`,
            value: "6",
        },
        {
            name: `${"0.".green} Salir`,
            value: "0",
        }
    
    ],
    }
]

const msgcon = [
    {
    type: "input",
    name: "Comfirmacion",
    message: `Presione ${"enter".green} para confirmar`,
    }
    
]

const deleteTasklist = async ( tareas = [] ) => {

    const choicex = tareas.map( (tarea, i) => {

        const idx =  `${i + 1 }. `.green;
        
        return {
            value : tarea.id,
            name: `${ idx } ${ tarea.desc}`,
        }


    });

    
    choicex.unshift({
        value : "0",
        name: '0. '.green + ' Cancelar',
    
    })

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices: choicex,
        }
    ]


    const { id } = await inquirer.prompt(preguntas);
    return id;


}

const completedtask   = async ( tareas = [] ) => {
    
    const choicex = tareas.map( (tarea, i) => {

        const idx =  `${i + 1 }. `.green;
        
        return {
            value : tarea.id,
            name: `${ idx } ${ tarea.desc}`,
            checked: (tarea.completadoEn ) ? true : false,
        }


    });

    const preguntas = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selecciones",
            choices: choicex,
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

const  inquirermenu = async () => {

    console.log(`========================`.green);
    console.log(`========================`.green);
    console.log(`    Tareas 1.0 G         `.red);
    console.log(`========================`.green);
    console.log(`========================\n`.green);

    const {opcion} = await  inquirer.prompt(questions);

    return opcion;

}

const pausa = async () =>{

    
    return await inquirer.prompt(msgcon);
}


const readinput = async(message) =>{

    const question = [

        {
            type: "input",
            name: "desc",
            message,
            validate(value)
                {
                if( value.length === 0)
                {
                    return `Porfavor ingrese algo`;
                }
                return true;   
            }
        }
    ]
    const {desc } = await inquirer.prompt(question);
    return desc;

}

const confirmacion  = async(message) => {

    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        }
    ];

    const {ok } = await inquirer.prompt(question);
    return ok;
} 
module.exports = {

    inquirermenu,pausa, readinput,deleteTasklist,confirmacion,completedtask
}