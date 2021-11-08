import express from 'express';
import cookieParser from 'cookie-parser';
import * as init from './var_box';
import m from './handler/handler';


interface InitList {
    db : boolean
    adminPage : boolean
}

class l{
    private list : InitList =  {db :false,adminPage : false};
    public initDB = (host : string,port : number,
        userName : string,password : string,dbName : string) => {
        init.initDB(host,port,userName,password,dbName).catch((reason)=>{
            throw reason;
        }).then(() => {
            this.list.db = true;
        });
    }



    public initAdminPagePath =(path : string) => {
        init.initAdminFolder(path)
        this.list.adminPage =true;
    }

    public createApiRouter = () => {
        if(this.list.db == false && this.list.adminPage == false)
            throw "not init this module";
        let router = express.Router();
        router.use(express.json());
        router.use(express.urlencoded());
        router.use(cookieParser());


        router.post("/login",m.publicHandler.adminLogin);
        router.get("/chk_session",m.publicHandler.sessionCheck);
        
        router.get("/get_menu",m.publicHandler.getList);
        router.post("/delete_item",m.privateHandler.delete);
        router.post("/create_item",m.privateHandler.create);
        return router;
    }



    public constructor() {}
}
const api = new l();

export const initMethod = {
    initDB : api.initDB,
    initAdminStaticPath : api.initAdminPagePath
}

export const createApiRouter = api.createApiRouter;
