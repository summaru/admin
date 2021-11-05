import mysql2, { FieldPacket, RowDataPacket } from 'mysql2/promise';
import Item from './item';

const q = "SELECT name,price,img_data FROM menu;";




export default async (conn : mysql2.Connection) :  Promise<Array<Item>> => {
    let [rows ,fields] : [RowDataPacket[],FieldPacket[]]= await conn.query(q);
    return rows.map((val,index,arr)=> {
        return val as Item
    })
}