import express from 'express';
import * as init from './var_box';
import {login} from './handler/login';
import m from './handler/menu';


interface InitList {
    db : boolean
    middleware : boolean
    staticPage : boolean
    router : boolean
}

class l{
    private list : InitList =  {db :false, middleware : false, staticPage : false,router :false};
    public initDB = (host : string,port : number,
        userName : string,password : string,dbName : string) => {
        init.initDB(host,port,userName,password,dbName).catch((reason)=>{
            throw reason;
        }).then(() => {
            this.list.db = true;
        });
    }

    public useMiddleware = (app : express.Express) => {
        app.use(express.json());
        app.use(express.urlencoded());

        this.list.middleware = true;
    }

    public setAdminStaticPage = (app : express.Express,path : string) => {
        init.initAdminFolder(path);
        app.use(express.static(path))
        this.list.staticPage = true;
    }

    public mappingApiRouter = (router : express.Router) => {
        router.use("/login",m.publicHandler.adminLogin);
        router.use("/chk_session",m.publicHandler.sessionCheck);
        
        router.use("/get_menu",m.publicHandler.getList);
        router.use("/delete_item",m.privateHandler.delete);
        router.use("/create_item",m.privateHandler.create);
        this.list.router = true;
    }

    public initList = () => {
        return this.list;
    }

    public constructor() {}
}
const api = new l();

export const mappingApiRouter = api.mappingApiRouter;
export const useMiddleware = api.useMiddleware;
export const initDB = api.initDB;
