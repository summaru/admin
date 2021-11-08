import  * as lib from '../src/lib'
import express from 'express';



let app = express();

lib.initMethod.initDB("localhost",3306,"cp","hello","test");
lib.initMethod.initAdminStaticPath("/admin_page");



let r = lib.createApiRouter();
app.use("/api",r);
app.listen(808,() => {
    console.log("connect");
})

