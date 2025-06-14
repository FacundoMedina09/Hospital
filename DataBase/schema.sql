create database Hospital;
use hospital;

/*Tabla de usuarios*/
Create table user(
	id int auto_increment primary key,
    name varchar (100),
    surname varchar(100),
    email varchar(100) unique,
    password  varchar(200),
    rol enum('Admin','Medic','Patient') not null
);

/*Tabla Especialidades de medicos*/
create table speciality(
	id int auto_increment primary key,
    name varchar(200)
);

/*Tabla de medicos*/
create table medic(
id int auto_increment primary key,
phone varchar(25),
user_id int unique,
speciality_id int,
foreign key (user_id) references user(id) on delete cascade,
foreign key (speciality_id) references speciality(id) 
);

/*Tabla de pacientes*/
create table patient(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT UNIQUE,
dni VARCHAR(20) UNIQUE,
phone VARCHAR(20),
direction VARCHAR(255),
date_birt DATE,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE medical_availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medic_id INT NOT NULL,
    day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (medic_id) REFERENCES medic(id) ON DELETE CASCADE,

    -- Validación: horario dentro de lo permitido por la clínica
    CHECK (start_time >= '08:00:00' AND end_time <= '18:00:00'),

    -- Validación: jornada mínima de 8 horas
    CHECK (TIMESTAMPDIFF(HOUR, start_time, end_time) >= 8)
);

-- Tabla: Citas
CREATE TABLE appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    medic_id INT,
    date DATETIME,
    state ENUM( 'Confirmed', 'Canceled', 'Completed'),
	Observations TEXT,
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (medic_id) REFERENCES medic(id)
);

-- Tabla: Consultas
CREATE TABLE consultation  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT,
    diagnostic TEXT,
    treatment TEXT,
    prescription TEXT,
    consultation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointment(id)
);




