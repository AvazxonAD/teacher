CREATE TABLE IF NOT EXISTS competitions (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    topics TEXT[] NOT NULL,
    prize VARCHAR(100),
    deadline VARCHAR(50),
    participants INTEGER,
    difficulty VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
);
