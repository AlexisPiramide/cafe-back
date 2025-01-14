CREATE TABLE usuarios (
    alias VARCHAR(50) PRIMARY KEY,
    password TEXT NOT NULL
);

CREATE TABLE tipos (
    nombre VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE cafes (
    nombre VARCHAR(100) PRIMARY KEY,
    tipo VARCHAR(50) PRIMARY KEY,
    imagen TEXT,
    tienda TEXT PRIMARY KEY,
    precio NUMBER NOT NULL,
    FOREIGN KEY (tipo) REFERENCES tipos(nombre) ON DELETE SET NULL
);

CREATE TABLE notas (
    usuario VARCHAR(50) NOT NULL,     
    cafe VARCHAR(100) NOT NULL,     
    nota INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
    PRIMARY KEY (usuario, cafe),
    FOREIGN KEY (usuario) REFERENCES usuarios(alias) ON DELETE CASCADE,
    FOREIGN KEY (cafe) REFERENCES cafes(nombre) ON DELETE CASCADE
);

CREATE TABLE carrito (
    id
    usuario VARCHAR(50) NOT NULL,
    cafe
    cantidad
)

CREATE TABLE pedido (
    id
    usuario VARCHAR(50) NOT NULL,
    cafe
    cantidad
)


-- Insert example users
INSERT INTO usuarios (alias, password) VALUES
('juan123', 'password123'),
('ana456', 'password456'),
('luis789', 'password789');

-- Insert example coffee types
INSERT INTO tipos (nombre) VALUES
('Espresso'),
('Latte'),
('Cappuccino'),
('Americano');

-- Insert example cafes
INSERT INTO cafes (nombre, tipo, imagen, link) VALUES
('Café de la Casa', 'Espresso', 'https://example.com/cafe1.jpg', 'https://example.com/cafe1'),
('Café Latte', 'Latte', 'https://example.com/cafe2.jpg', 'https://example.com/cafe2'),
('Cappuccino Perfecto', 'Cappuccino', 'https://example.com/cafe3.jpg', 'https://example.com/cafe3'),
('Americano Clásico', 'Americano', 'https://example.com/cafe4.jpg', 'https://example.com/cafe4');

-- Insert example ratings (notas)
INSERT INTO notas (usuario, cafe, nota) VALUES
('juan123', 'Café de la Casa', 5),
('ana456', 'Café Latte', 4),
('luis789', 'Cappuccino Perfecto', 3),
('juan123', 'Americano Clásico', 2),
('ana456', 'Cappuccino Perfecto', 5);
