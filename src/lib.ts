import express from 'express';
import {init} from './db';
import {login} from './handler/login';
import m from './handler/menu';


class l{
    private isUseMiddleware = false;

    public initDB = (host : string,port : number,
        userName : string,password : string,dbName : string) => {
        init(host,port,userName,password,dbName).catch((reason)=>{
            throw reason;
        });
    }
    public useMiddleware = (app : express.Express) => {
        app.use(express.json());
        app.use(express.urlencoded());
        this.isUseMiddleware = true;
    }
    public mappingApiRouter = (router : express.Router) => {
        if (!this.isUseMiddleware)
            throw "call useMiddleware method,when before call mappingApiRouter";
        router.use("/login",login);
        
        router.use("/get_menu",m.publicHandler.getList);
        router.use("/delete_item",m.privateHandler.delete);
        router.use("/create_item",m.privateHandler.create);
    }

    public constructor() {}
}
const api = new l();

export const mappingApiRouter = api.mappingApiRouter;
export const useMiddleware = api.useMiddleware;
export const initDB = api.initDB;
