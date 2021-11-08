import express from 'express';
import {getConn} from '../var_box';
import select from '../table/select';
import del from '../table/delete';
import create from '../table/insert';
import info from './login/admin_info';



export const selectHandler =  (req : express.Request,res : express.Response) => {
    select(getConn()).then((value)=> {
        res.status(200).send(JSON.stringify(value));
    })
    .catch((reason)=> {
        res.status(500).send(reason);
    });
}

export const deleteHandler =  (req : express.Request,res : express.Response) => {
    if (info.SessionKey == req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }
    let name = req.body.name;
    del(getConn(),name).then(()=> {
        res.status(200).send("");
    })
    .catch((reason)=> {
        res.status(500).send(reason);
    });
}

export const createHandler =  (req : express.Request,res : express.Response) => {
    if (info.SessionKey == req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }


    let d : {name : string,price : number,data : Uint8Array} = req.body;
    create(getConn(),d).then(()=> {
        res.status(200).send("");
    })
    .catch((reason)=> {
        res.status(500).send(reason);
    });
}