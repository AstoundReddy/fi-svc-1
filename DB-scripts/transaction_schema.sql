CREATE TABLE Transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category_id INT,
    description TEXT,
    user_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);