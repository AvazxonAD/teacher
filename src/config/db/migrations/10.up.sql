CREATE TABLE IF NOT EXISTS methodologies (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    downloads INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    date DATE NOT NULL,
    category VARCHAR(150),
    pages INTEGER,
    isdeleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
