import express from 'express';
import info from './login/admin_info';


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
        maxAge : 10000
    });

    res.status(200).send("ok"); 
}
