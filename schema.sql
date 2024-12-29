CREATE TABLE usuarios (
    alias VARCHAR(50) PRIMARY KEY,
    password TEXT NOT NULL
);

CREATE TABLE cafes (
    nombre VARCHAR(100) PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,,  
    imagen TEXT,
    link TEXT 
);

CREATE TABLE notas (
    usuario VARCHAR(50) NOT NULL,     
    cafe VARCHAR(100) NOT NULL,     
    nota INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
    PRIMARY KEY (usuario, cafe),
    FOREIGN KEY (usuario) REFERENCES usuarios(alias) ON DELETE CASCADE,
    FOREIGN KEY (cafe) REFERENCES cafes(nombre) ON DELETE CASCADE
);
