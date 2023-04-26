import React, { useContext, useEffect, useState } from 'react'
import "./register.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Select from 'react-select';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Spiner from "../../components/Spiner/Spiner"
import { registerfunc } from '../../services/Apis';
import { useNavigate } from 'react-router-dom';
import { addData } from '../../components/context/ContextProvider';
const Register = () => {
    //for spinner

    const [showspin,setShowSpin]=useState(true);
    //for get data input
    const [inputdata, setInputData] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: "",
    });
    //console.log(inputdata);
    const [status, setStatus] = useState("Active");
    const [image, setImage] = useState("");
    //for change and send path to 
    const [preview, setPreview] = useState("");
    const navigate=useNavigate();
    const {useradd,setUseradd}=useContext(addData);
    console.log(useradd);
    //function set input value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value });
    }
    const setStatusValue = (e) => {
        setStatus(e.value);
        // console.log(e);
    }
    //  Profile set
    const setProfile = (e) => {
        setImage(e.target.files[0])
    }
    //submit user data 
    const submitUserData = async(e) => {
        //submit onclick ma aapdu page load no leee this two line
        e.preventDefault();
        const {fname,lname,email,mobile,gender,location} = inputdata;

        if (fname === "") {
            toast.error("First name is Required !")
          } else if (lname === "") {
            toast.error("Last name is Required !")
          } else if (email === "") {
            toast.error("Email is Required !")
          } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
          } else if (mobile === "") {
            toast.error("Mobile is Required !")
          } else if (mobile.length > 10) {
            toast.error("Enter Valid Mobile!f")
          } else if (gender === "") {
            toast.error("Gender is Required !")
          } else if (status === "") {
            toast.error("Status is Required !")
          } else if (image === "") {
            toast.error("Prfile is Required !")
          } else if (location === "") {
            toast.error("location is Required !")
          }else{
            const data=new FormData();
            //key [fname] and value[fname]
            data.append("fname",fname);
            data.append("lname",lname);
            data.append("email",email);
            data.append("mobile",mobile);
            data.append("gender",gender);
            //useState
            data.append("status",status);
            //useState
            data.append("user_profile",image);
            data.append("location",location);
            
            const config={
                "Config-Typer":"multipart/form-data"
            }
            const response=await registerfunc(data,config);
            console.log(response);
            //if our status is 200 so we set our field empty
            if(response.status === 200){
                setInputData({
                  ...inputdata,
                  fname:"",
                  lname: "",
                  email: "",
                  mobile: "",
                  gender: "",
                  location: ""
                });
                setStatus("");
                setImage("");
            }
            else
            {
                toast.error("Error!")
            }
            navigate("/");
            setUseradd(response.data);

         //   toast.success("Registration Succesfully Done !");
            
          }
    }
    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image))
        }
        setTimeout(()=>{
                setShowSpin(false);
        },400);
    }, [image]);

    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' }
    ];

    return (
        <>
    {
        showspin ? <Spiner/>:
        <div className="container">
        <h2 className='text-center mt-1'>Register Your Details</h2>
        <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
                <img src={preview ? preview : "/parth_photo.jpg"} alt="img">
                </img>
            </div>

            <Form>
                <Row>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="fname" value={inputdata.fname} onChange={setInputValue} placeholder="Enter First Name" />

                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputValue} placeholder='Enter Last Name' />

                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={inputdata.email} onChange={setInputValue} placeholder='Enter Email Address' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" name="mobile"value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Your Mobile Number' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>Select Your Gender</Form.Label>
                        <Form.Check
                            type={"radio"}
                            label={`Male`}
                            name="gender"
                            value={"Male"}
                            onChange={setInputValue}
                        />
                        <Form.Check
                            type={"radio"}
                            label={`Female`}
                            name="gender"
                            value={"Female"}
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>Yout Status</Form.Label>
                        <Select
                            options={options}
                            onChange={setStatusValue} />
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>Select Your Profile</Form.Label>
                        <Form.Control type="file" name="user_profile"  onChange={setProfile} placeholder='Select Your Profile' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                        <Form.Label>Enter Your Location</Form.Label>
                        <Form.Control type="text" name="location" value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' />
                    </Form.Group>


                    <Button variant="primary" type="submit" onClick={submitUserData}>
                        Submit
                    </Button>
                </Row>
            </Form>
        </Card>
        <ToastContainer position ="top-center"/>


    </div>
    }       
        </>
    )
}
export default Register
