import express from 'express';
import {getConn} from '../../var_box';
import table from '../../table/select';




export default (req : express.Request,res : express.Response) => {
    table(getConn()).then((value)=> {
        res.status(200).send(JSON.stringify(value));
    })
    .catch((reason)=> {
        res.status(500).send(reason);
    });
}