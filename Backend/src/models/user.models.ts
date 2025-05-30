
import { DataType, DataTypes } from "sequelize";
import db from '../db/connection.db';

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    //Definir la pk para evitar un error
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.ENUM("Admin", "Medico", "Paciente"),
        allowNull: false,
    }},

    {
        freezeTableName: true,   //Nombre de la tabla que definimos va a ser igual a la tabla de la base de datos
        createdAt: false,       //Definimos que no utilizamos fecha de creacion en nuestra tabla
        updatedAt: false        //Definimos que no utilizamos fecha de modificacion en nuestra tabla
        
    }
);

export default User; // Exportamos el User y sus atrivutos para utilizar en el controlador