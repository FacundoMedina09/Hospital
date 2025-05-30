import { DataType, DataTypes } from "sequelize";
import db from '../db/connection.db';

const Medic = db.define('medic', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    //Definir la pk para evitar un error
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        unique:true,
        allowNull: false
    },
    speciality_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
    },

    {
        freezeTableName: true,   //Nombre de la tabla que definimos va a ser igual a la tabla de la base de datos
        createdAt: false,       //Definimos que no utilizamos fecha de creacion en nuestra tabla
        updatedAt: false        //Definimos que no utilizamos fecha de modificacion en nuestra tabla
        
    }
);

export default Medic; // Exportamos Medic y sus atrivutos para utilizar en el controlador