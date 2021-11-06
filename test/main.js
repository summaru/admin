const s = require("../dist/lib");
const express = require("express");


const l = s;
const app = express();


const router = express.Router();

l.useMiddleware(app);
l.mappingApiRouter(router);
app.use("/d",router);


app.listen(300,()=> {

});


