CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(150),
    pages INTEGER,
    rating NUMERIC(2,1),
    downloads INTEGER DEFAULT 0,
    is_bookmarked BOOLEAN DEFAULT FALSE,
    description TEXT,
    pdf_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
);
