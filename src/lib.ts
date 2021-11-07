import express from 'express';
import * as init from './var_box';
import m from './handler/handler';


interface InitList {
    db : boolean
    middleware : boolean
}

class l{
    private list : InitList =  {db :false, middleware : false};
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

    public createApiRouter = () => {
        if(this.list.db == false && this.list.middleware == false)
            throw "not init this module";
        let router = express.Router();
        router.use("/login",m.publicHandler.adminLogin);
        router.use("/chk_session",m.publicHandler.sessionCheck);
        
        router.use("/get_menu",m.publicHandler.getList);
        router.use("/delete_item",m.privateHandler.delete);
        router.use("/create_item",m.privateHandler.create);
        return router;
    }



    public constructor() {}
}
const api = new l();

export const initMethod = {
    initDB : api.initDB,
    middleware : api.useMiddleware,
}

export const createApiRouter = api.createApiRouter;
