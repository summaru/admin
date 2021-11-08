import mysql2 from 'mysql2/promise';

const q = `CREATE TABLE IF NOT EXISTS menu (
    name VARCHAR(48) PRIMARY KEY,
    price INTEGER,
    image_type VARCHAR(24) NOT NULL,
    img_data LONGBLOB  NOT NULL);`;

export default async (conn : mysql2.Connection) => {
    conn.execute(q);
}