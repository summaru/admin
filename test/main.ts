import  * as lib from '../src/lib'
import express from 'express';



let app = express();
app.use("/",express.static("./admin_page"));


lib.initMethod.initDB("localhost",3306,"cp","hello","test");
lib.initMethod.initAdminStaticPath("/admin.html");



let r = lib.createApiRouter();
app.use("/api",r);
app.listen(808,() => {
    console.log("connect");
})

