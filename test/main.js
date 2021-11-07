const s = require("../dist/lib");
const express = require("express");


const l = s;
const app = express();


l.initMethod.initDB();
l.initMethod.middleware(app);


let router = l.createApiRouter();
app.use("/api",router);

app.listen(8080,()=> {

});