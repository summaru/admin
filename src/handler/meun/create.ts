import express from 'express';
import {getConn} from '../../db';
import table from '../../table/insert';
import info from '../login/admin_info';



export default (req : express.Request,res : express.Response) => {
    if (info.SessionKey == req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }


    let d : {name : string,price : number,data : Uint8Array} = req.body;
    table(getConn(),d).then(()=> {
        res.status(200).send("");
    })
    .catch((reason)=> {
        res.status(500).send(reason);
    });
}