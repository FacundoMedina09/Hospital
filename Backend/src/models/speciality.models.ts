import { DataType, DataTypes } from "sequelize";
import db from '../db/connection.db';

const Speciality = db.define('speciality', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    //Definir la pk para evitar un error
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },
    {
        freezeTableName: true,   //Nombre de la tabla que definimos va a ser igual a la tabla de la base de datos
        createdAt: false,       //Definimos que no utilizamos fecha de creacion en nuestra tabla
        updatedAt: false        //Definimos que no utilizamos fecha de modificacion en nuestra tabla
        
    }
);

export default Speciality; // Exportamos Speciality y sus atrivutos para utilizar en el controlador