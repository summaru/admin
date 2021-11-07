import mysql2 from 'mysql2/promise';


let conn : mysql2.Connection;
let staticPath : string;


export async function initDB(host : string,port : number,
    userName : string,password : string,dbName : string) {
    conn =await mysql2.createConnection({
        host : host,
        port : port,
        user : userName,
        password : password,
        database : dbName
    });
}

export function initAdminFolder(path : string) {
    staticPath = path;
}



export function getAdminStatic() : string {
    return staticPath;
} 

export function getConn() : mysql2.Connection {
    return conn;
}