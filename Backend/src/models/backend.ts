import express, {Application, Request, Response} from 'express'; //Importamos express para poder utilizarlo
import cors from 'cors';
import router from '../routes/routes';
import db from '../db/connection.db';



//Nuestro servidor
class BackEnd{

    private app: Application;   //Creamos la api
    private port: String | undefined;       //Puerto que utilizaremos

    constructor(){
        this.app = express();   //Inicializamos la api
        this.port = process.env.PORT || "3001";     //Inicializamos el puerto
        
        this.Listen(); //Lanzamos nuestro servidor 
        this.Midlewares();     
        this.Routes();          
        this.dbConexion();
        
    }
     Midlewares(){ //Metodo que utilizamos para parsear nuestro json a un objeto de js 
        this.app.use(express.json());
        //Cords
        this.app.use(cors());   //Necesario ya que sino hay un error al querer complementar las host
    }

    Routes(){
    
        this.app.use('/', router);
        this.app.get("/", (req: Request, res: Response)=>{
            res.json({msg: 'Api Working'})
        })
       
    }
    //Metodo por el cual vamos a lanzar nuestra base de datos
    async dbConexion(){
        try {
            await db.authenticate();
            console.log("conexion creada")
        } catch (error) {
            console.log(error)
            console.log("conexion errada")
        }
    }

    //Metodo por el cual lanzamos el servidor
    Listen(){
        this.app.listen(this.port, () => {
            console.log("Aplicacion corriendo en el puerto " + this.port);
        })
    }

}

export default BackEnd;