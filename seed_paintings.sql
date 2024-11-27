-- Drop tables if they exist (to start fresh)
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS paintings;

-- Create the paintings table with picture_url and alt_text included
CREATE TABLE paintings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    date_created DATE DEFAULT NOW(),
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    picture_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data for paintings
INSERT INTO paintings (title, description, date_created, price, stock, width, height, picture_url, alt_text) VALUES
('Rugalech', 'This is a beautiful painting titled Rugalech.', '2024-01-01', 100.00, 1, 50, 70, '/paintings/rugalech.jpg', 'A painting of Rugalech.'),
('Rainforest', 'This is a beautiful painting titled Rainforest.', '2024-01-01', 100.00, 1, 50, 70, '/paintings/rainforest.jpg', 'A painting of Rainforest.'),
('Feather', 'This is a beautiful painting titled Feather.', '2024-01-01', 100.00, 1, 50, 70, '/paintings/feather.jpg', 'A painting of Feather.'),
('Olive Tree', 'This is a beautiful painting titled Olive Tree.', '2024-01-01', 100.00, 1, 50, 70, '/paintings/olive_tree.jpg', 'A painting of Olive Tree.'),
('Citrus', 'This is a beautiful painting titled Citrus.', '2024-01-01', 100.00, 1, 50, 70, '/paintings/citrus.jpg', 'A painting of Citrus.'),
('Shabbas Flowers', 'This is a beautiful painting titled Shabbas Flowers.', '2024-01-01', 100.00, 1, 50, 70, '/paintings/shabbas_flowers.jpg', 'A painting of Shabbas Flowers.'),
('Phoenix', 'This is a beautiful painting titled Phoenix.', '2024-01-01', 100.00, 1, 50, 70, '/paintings/phoenix.jpg', 'A painting of Phoenix.');

-- Verify data (optional)
SELECT * FROM paintings;
