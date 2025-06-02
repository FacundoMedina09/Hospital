import { Carrusel } from "../interfaces/carrusel.interfaces";

export const CARRUSEL_DATA_ITEMS: Carrusel[] = [
    {
        id: 1,
        title: {
            first: 'Nuestra',
            second: 'Filosofia'
        },
        subtitle: 'Conocenos',
        link: '/',
        image: '../../assets/Hospital.jpg',
    },
    {
        id: 2,
        title: {
            first: 'Junio y Julio',
            second: 'de donaciones'
        },
        subtitle: 'Acercate a dejar tu donacion',
        link: '/',
        image: '../../assets/Donaciones.jpg',
    },
    {
        id: 3,
        title: {
            first: 'Nuestras',
            second: 'especialidades'
        },
        subtitle: 'Contamos con mas de 30 especialidades',
        link: '/',
        image: '../../assets/EspecialidadesDashboard.jpg',
    },
     {
        id: 4,
        title: {
            first: 'Turnos',
            second: 'Online'
        },
        subtitle: 'Click en el boton para mas informacion',
        link: '/',
        image: '../../assets/SolicitarTurno.jpg',
    }
];