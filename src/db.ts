import mysql2 from 'mysql2/promise';


let conn : mysql2.Connection;

export async function init(host : string,port : number,
    userName : string,password : string,dbName : string) {
    conn =await mysql2.createConnection({
        host : host,
        port : port,
        user : userName,
        password : password,
        database : dbName
    });
}

export function getConn() : mysql2.Connection {
    return conn;
}