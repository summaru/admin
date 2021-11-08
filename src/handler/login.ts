import express from 'express';
import info from './login/admin_info';
import {getAdminStatic} from '../var_box';

const chkInfo = (userName : string,password : string) : boolean =>  {
    return (info.AdminName == userName && info.AdminPassword == password);
}

export const login = (req : express.Request,res : express.Response) => {
    let userName : string = req.body.userName;
    let password : string = req.body.password;

    if (chkInfo(userName,password)) {
        res.status(400).send("로그인 실패");
        return;
    }

    res.cookie("session",info.SessionKey,{
        maxAge : 10000,
        path : "/"
    });

    res.redirect(302,"/"+getAdminStatic());
}

export const chkSession = (req : express.Request,res : express.Response) => {
    if (req.cookies == undefined) {
        res.status(400).send("no cookies");
        return;
    }
    if (info.SessionKey != req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }
    
    res.status(200).send("ok"); 
}
