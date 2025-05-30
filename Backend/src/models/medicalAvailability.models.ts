
import { DataType, DataTypes } from "sequelize";
import db from '../db/connection.db';

const MedicalAvailability = db.define('medical_availability', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    //Definir la pk para evitar un error
    },
    medic_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    day: {
        type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
    }
    },
    {
        freezeTableName: true,   //Nombre de la tabla que definimos va a ser igual a la tabla de la base de datos
        createdAt: false,       //Definimos que no utilizamos fecha de creacion en nuestra tabla
        updatedAt: false        //Definimos que no utilizamos fecha de modificacion en nuestra tabla
        
    }
);

export default MedicalAvailability; // Exportamos MedicalAvailability y sus atrivutos para utilizar en el controlador