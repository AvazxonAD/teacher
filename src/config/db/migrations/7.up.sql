CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author VARCHAR(150),
    read_time VARCHAR(50),
    category VARCHAR(150),
    pdf_url TEXT,
    downloads INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    page_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);
