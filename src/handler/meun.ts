import express from 'express';
import {getConn} from '../var_box';
import select from '../table/select';
import del from '../table/delete';
import create from '../table/insert';
import info from './login/admin_info';
import fileUpload, { UploadedFile } from 'express-fileupload';



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
    console.log(req.body);
    console.log(req.files);
    if (info.SessionKey == req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }

    let f = req.files?.image as UploadedFile;
    let d : {name : string,price : number,image_type : string,data : Uint8Array} = {
        name : req.body.name,
        price : req.body.price,
        image_type : f.mimetype,
        data : f.data
    };
    create(getConn(),d).then(()=> {
        res.status(200).send("");
    })
    .catch((reason)=> {
        console.log("create item error =>" + reason);
        res.status(500).send(reason);
    });
}
