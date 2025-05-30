
import { DataType, DataTypes } from "sequelize";
import db from '../db/connection.db';

const Query = db.define('query', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    //Definir la pk para evitar un error
    },
    appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diagnostic: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    prescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    consultation_date: {
        type: DataTypes.DATE
    }
    },
    {
        freezeTableName: true,   //Nombre de la tabla que definimos va a ser igual a la tabla de la base de datos
        createdAt: false,       //Definimos que no utilizamos fecha de creacion en nuestra tabla
        updatedAt: false        //Definimos que no utilizamos fecha de modificacion en nuestra tabla
        
    }
);

export default Query; // Exportamos Query y sus atrivutos para utilizar en el controlador