import { Sequelize } from "sequelize";

//Constante que almacena nuestra base de datos
const sequelize = new Sequelize('hospital','root','root1234',{
    host: 'localhost',
    dialect: 'mysql',
    /*logging: false //Con esto eliminamos un mensaje que se imprime en consola, no afecta en nuestro proyecto
    */

});
export default sequelize; //Exportamos nuestra base de datos para poder utlizarla
