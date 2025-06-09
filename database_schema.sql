-- Database schema for gunshop

CREATE DATABASE IF NOT EXISTS gunshop;
USE gunshop;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    fullname VARCHAR(100)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    type VARCHAR(50)
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    purchase_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Purchase items table
CREATE TABLE IF NOT EXISTS purchase_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample data for products
INSERT INTO products (name, price, description, image_url, type) VALUES
('Пистолет-пулемет Cyma FN P90', 11000, 'Компактный и мощный пистолет-пулемет для ближнего боя.', '/Link/111.png', 'автомат'),
('Гранатомёт СтрайкАрт "Малыш 2.0" "Тюльпан"', 8000, 'Данный гранатомёт предназначен в первую очередь для скрытых диверсий благодаря своим компактным размерам.', '/Link/112.png', 'пистолет'),
('Дробовик Remington 870', 13000, 'Мощный дробовик для ближнего боя и защиты.', '/Link/113.png', 'дробовик'),
('Автоматический карабин CYMA CM.028', 14000, 'Универсальный автоматический карабин для различных задач.', '/Link/114.png', 'автомат'),
('Тактический пистолет KJW KP-06', 9000, 'Компактный тактический пистолет с улучшенной эргономикой.', '/Link/115.png', 'пистолет'),
('Снайперская винтовка с оптикой WELL MB03', 44000, 'Высокоточная винтовка с прицелом для дальних дистанций.', '/Link/116.png', 'винтовка'),
('Пистолет с глушителем KJW KP-07', 8500, 'Тихий пистолет с глушителем для скрытных операций.', '/Link/117.png', 'пистолет'),
('Автомат с прицелом CYMA CM.028', 15000, 'Автомат с улучшенным прицелом для точной стрельбы.', '/Link/118.png', 'автомат'),
('Пистолет-пулемет с лазером CYMA CM.028', 12000, 'Пистолет-пулемет с лазерным прицелом для быстрой реакции.', '/Link/119.png', 'автомат');

-- Sample user (password is plain text for simplicity, consider hashing in production)
INSERT INTO users (username, password, email, fullname) VALUES
('testuser', 'password123', 'testuser@example.com', 'Test User');
