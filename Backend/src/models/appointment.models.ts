
import { DataType, DataTypes } from "sequelize";
import db from '../db/connection.db';

const Appointment = db.define('appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    //Definir la pk para evitar un error
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medic_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM("Confirmed", "Canceled", "Completed"),
        allowNull: false,
    },
    observations: {
        type: DataTypes.TEXT
    },
    },

    {
        freezeTableName: true,   //Nombre de la tabla que definimos va a ser igual a la tabla de la base de datos
        createdAt: false,       //Definimos que no utilizamos fecha de creacion en nuestra tabla
        updatedAt: false        //Definimos que no utilizamos fecha de modificacion en nuestra tabla
        
    }
);

export default Appointment; // Exportamos Appointmentr y sus atrivutos para utilizar en el controlador