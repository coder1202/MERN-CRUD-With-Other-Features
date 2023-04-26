const express = require("express");
const router = new express.Router();
const controller = require("../Controllers/userControllers");
const upload = require("../multerconfig/storageConfig");


//This upload.single("user_profile for single image uplaod")
router.post("/user/register", upload.single("user_profile"), controller.userpost);

//for userdetails for show table all user 
router.get("/user/details", controller.userget);
//for get single user
router.get("/user/:id", controller.singleuserget);
//for edit 
router.put("/user/edit/:id", upload.single("user_profile"), controller.useredit);

router.delete("/user/delete/:id", controller.userdelete);

//for active inactive change in table
router.put("/user/status/:id", controller.userstatus);
router.get("/userexport", controller.userExport);

module.exports = router;