import express from 'express';
import {getConn} from '../../db';
import table from '../../table/delete';
import info from '../login/admin_info';


export default (req : express.Request,res : express.Response) => {
    if (info.SessionKey == req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }
    let name = req.body.name;
    table(getConn(),name).then(()=> {
        res.status(200).send("");
    })
    .catch((reason)=> {
        res.status(500).send(reason);
    });
}