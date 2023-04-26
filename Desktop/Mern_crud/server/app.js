 require("dotenv").config();
 const express = require("express");
 require("./db/conn");
 //Start Our express application
 const app = express();
 //using this for connect fronted
 const cors = require("cors");
 const router = require("./Routes/router");
 const port = process.env.port || 6010

 app.use(cors());
 app.use(express.json());
 app.use(router);
 //for fronted side show data image
 //app.use("/uploads", express.static("./uploads"));
 app.use("/uploads", express.static("./uploads"));
 //FOR CSV FILE
 app.use("/files", express.static("./public/files"));

 app.listen(port, () => {
     console.log(`Server Start at Port No ${port}`);
 });