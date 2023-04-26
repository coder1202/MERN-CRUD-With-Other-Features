//router 
const users = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
//const BASE_URL = process.env.BASE_URL

//register user
exports.userpost = async(req, res) => {
        //for postman
        //console.log(req.file);
        // console.log(req.body);

        const file = req.file.filename;
        //to get user data
        const { fname, lname, email, mobile, gender, location, status } = req.body;
        if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
            res.status(401).json("All Input Is Required")
        }
        try {
            const peruser = await users.findOne({ email: email });
            if (peruser) {
                res.status(401).json("This user already exist in our DataBase")

            } else {
                const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
                const useData = new users({
                    fname,
                    lname,
                    email,
                    mobile,
                    gender,
                    location,
                    status,
                    user_profile: file,
                    datecreated
                });
                await useData.save();
                res.status(200).json(useData);
            }
        } catch (e) {
            res.status(401).json(e)
            console.log("catch block error");
        }
    }
    /*
    //for view table data userget
exports.userget = async(req, res) => {
        const search = req.query.search || ""
        const gender = req.query.gender || ""
        const status = req.query.status || ""
        const sort = req.query.sort || ""
        const page = req.query.page || 1
        const ITEM_PER_PAGE = 4;


        const query = {
            fname: { $regex: search, $options: "i" }
        }

        if (status !== "All")
            query.status = status
        if (gender !== "All")
            query.gender = gender

        try {
            //1*4=4
            const skip = (page - 1) * ITEM_PER_PAGE
            const count = await users.countDocuments(query);
            //console.log(count);

            //console.log(req.query);
            //schema ma mathi bdha user ne find kriya
            const usersdata = await users.find(query)
                .sort({ datecreated: sort === "new" ? -1 : 1 })
                .limit(ITEM_PER_PAGE)
                .skip(skip)
            const pageCount = Math.ceil(count / ITEM_PER_PAGE); //  8/4=2

            res.status(200).json({
                    Pagination: { count, pageCount }
                },
                usersdata);

        } catch (e) {
            res.status(401).json(e);
        }

    }
    */
    // for usersget
exports.userget = async(req, res) => {

        const search = req.query.search || ""
        const gender = req.query.gender || ""
        const status = req.query.status || ""
        const sort = req.query.sort || ""
        const page = req.query.page || 1
        const ITEM_PER_PAGE = 4;


        const query = {
            //regex search krke denga 
            // if user time upper-lower so 'i' got also got result
            fname: { $regex: search, $options: "i" }
        }

        if (gender !== "All") {
            query.gender = gender
        }

        if (status !== "All") {
            query.status = status
        }

        try {

            const skip = (page - 1) * ITEM_PER_PAGE // 1 * 4 = 4

            const count = await users.countDocuments(query);

            const usersdata = await users.find(query)
                .sort({ datecreated: sort == "new" ? -1 : 1 })
                .limit(ITEM_PER_PAGE)
                .skip(skip);

            const pageCount = Math.ceil(count / ITEM_PER_PAGE); // 8 /4 = 2

            res.status(200).json({
                Pagination: {
                    count,
                    pageCount
                },
                usersdata
            })
        } catch (error) {
            res.status(401).json(error)
        }
    }
    //view page data
exports.singleuserget = async(req, res) => {
    const { id } = req.params;
    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata);

    } catch (e) {
        res.status(401).json(e)

    }
}

// user edit
exports.useredit = async(req, res) => {
        //to get id use params
        const { id } = req.params;
        //to get user get data 
        const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body;
        //if you dont want to update image than it save old one
        const file = req.file ? req.file.filename : user_profile

        const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        try {
            const updateuser = await users.findByIdAndUpdate({ _id: id }, {
                fname,
                lname,
                email,
                mobile,
                gender,
                location,
                status,
                user_profile: file,
                dateUpdated
            }, {
                //only send updated value 
                new: true
            });

            await updateuser.save();
            res.status(200).json(updateuser);
        } catch (error) {
            res.status(401).json(error)
        }
    }
    //de;ete
exports.userdelete = async(req, res) => {
        const { id } = req.params;
        try {
            const deletuser = await users.findByIdAndDelete({ _id: id });
            res.status(200).json(deletuser);
        } catch (error) {
            res.status(401).json(error)
        }
    }
    //change state
exports.userstatus = async(req, res) => {
    //to directly got id we use params
    const { id } = req.params;
    const { data } = req.body;

    try {
        const userstatusupdate = await users.findByIdAndUpdate({ _id: id }, { status: data }, { new: true });
        res.status(200).json(userstatusupdate)
    } catch (error) {
        res.status(401).json(error)
    }
}

// export user
exports.userExport = async(req, res) => {
    try {
        //first find user
        const usersdata = await users.find();

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("public/files/export/")) {
            if (!fs.existsSync("public/files")) {
                fs.mkdirSync("public/files/", { recursive: true });
                //   fs.mkdirSync(targetDir, { recursive: true });

            }
            if (!fs.existsSync("public/files/export")) {
                fs.mkdirSync("./public/files/export/");
            }
        }
        //here we use nodejs stream
        const writablestream = fs.createWriteStream(
            "public/files/export/users.csv"
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function() {
            res.json({
                downloadUrl: `http://localhost:6010/files/export/users.csv`,
            });
        });
        if (usersdata.length > 0) {
            usersdata.map((user) => {
                csvStream.write({
                    FirstName: user.fname ? user.fname : "-",
                    LastName: user.lname ? user.lname : "-",
                    Email: user.email ? user.email : "-",
                    Phone: user.mobile ? user.mobile : "-",
                    Gender: user.gender ? user.gender : "-",
                    Status: user.status ? user.status : "-",
                    Profile: user.user_profile ? user.profile : "-",
                    Location: user.location ? user.location : "-",
                    DateCreated: user.datecreated ? user.datecreated : "-",
                    DateUpdated: user.dateUpdated ? user.dateUpdated : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}