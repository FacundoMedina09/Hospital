
import { DataType, DataTypes } from "sequelize";
import db from '../db/connection.db';
import User from "./user.models";

const Patient = db.define('patient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,    //Definir la pk para evitar un error
        references: { model: User, key: 'id' }
    },
    user_id: {
        type: DataTypes.INTEGER,
        unique:true
    },
    dni: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_birt: {
        type: DataTypes.DATE,
        allowNull: false
    }
    },

    {
        freezeTableName: true,   //Nombre de la tabla que definimos va a ser igual a la tabla de la base de datos
        createdAt: false,       //Definimos que no utilizamos fecha de creacion en nuestra tabla
        updatedAt: false        //Definimos que no utilizamos fecha de modificacion en nuestra tabla
        
    }
);

export default Patient; // Exportamos el Patient y sus atrivutos para utilizar en el controlador