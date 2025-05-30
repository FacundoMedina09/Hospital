import express, {Application} from 'express'; //Importamos express para poder utilizarlo
import cors from 'cors';


//Nuestro servidor
class BackEnd{

    private app: Application;   //Creamos la api
    private port: String | undefined;       //Puerto que utilizaremos

    constructor(){
        console.log("hola constructor")
        this.app = express();   //Inicializamos la api
        this.port = process.env.PORT || "3001";     //Inicializamos el puerto

        this.Listen(); //Lanzamos nuestro servidor 
    }

    //Metodo por el cual lanzamos el servidor
    Listen(){
        this.app.listen(this.port, () => {
            console.log("Aplicacion corriendo en el puerto " + this.port);
        })
    }


}

export default BackEnd;