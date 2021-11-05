import mysql2, { FieldPacket, RowDataPacket } from 'mysql2/promise';
const q = "DELETE FROM menu WHERE name = ?;";


export default async (conn : mysql2.Connection,name : string) :  Promise<void> => {
    await conn.execute(q,[name]);
}