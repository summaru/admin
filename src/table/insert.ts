import mysql2, { FieldPacket, RowDataPacket } from 'mysql2/promise';
import Item from './item';

const q = "INSERT INTO menu(name,price,image_type,img_data) VALUES(?,?,?,?);";




export default async (conn : mysql2.Connection,i : Item) :  Promise<void> => {
    await conn.execute(q,[i.name,i.price,i.image_type,i.data]);
}