const fs = require ('fs');
const archivo = './db/data.json';

const saveDB = ( data ) => {

    

    fs.writeFileSync(archivo, JSON.stringify(data));

}


const readDB = () =>{

    if (!fs.existsSync(archivo))
    {
        return null;
    }

    let info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    info = JSON.parse(info);
    
    return info;

}




module.exports = {
    saveDB,readDB
}