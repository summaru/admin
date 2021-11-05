import mysql2 from 'mysql2/promise';

const q = `CREATE TABLE IF NOT EXISTS 'menu' (
    name VARCHAR(48) PRIMARY KEY,
    price INTEGER,
    img_data LONGBLOB);`;

export default async (conn : mysql2.Connection) => {
    conn.execute(q);
}