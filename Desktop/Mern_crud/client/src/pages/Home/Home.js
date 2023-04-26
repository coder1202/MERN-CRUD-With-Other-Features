import React, { useContext, useEffect, useState } from 'react'
import "./home.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import Card from "react-bootstrap/Card"
//import Row from "react-bootstrap/Row"
import Dropdown from 'react-bootstrap/Dropdown';
//use Navigate hook 
//we can also use nevlink
import { useNavigate } from "react-router-dom";
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner"
import { addData, dltdata } from '../../components/context/ContextProvider';
import { updateData } from '../../components/context/ContextProvider';
import Alert from 'react-bootstrap/Alert';
import { usergetfunc, deletefunc,exporttocsvfunc } from "../../services/Apis"
import { toast } from 'react-toastify';
import Paginations from '../../components/Pagination/Paginations';
const Home = () => {
    const [userdata, setUserData] = useState([]);
    const [showspin, setShowSpin] = useState(true);
    //for redirect
    const navigate = useNavigate();
    const adduser = () => {
        navigate("/register")
    }

    const { useradd, setUseradd } = useContext(addData);
    const { update, setUpdate } = useContext(updateData);
    // const [deletedata, setDLtdata] = useContext(dltdata);
    const { deletedata, setDLtdata } = useContext(dltdata);
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("All");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("new");
    const [page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState(0);

    //for user get userget
     const userGet = async () => {
        const response = await usergetfunc(search, gender, status, sort);
        console.log(response);
        if (response.status === 200) {
            //add userdata for pagination because we change response there so 
            //response.data use bcoz get data
            setUserData(response.data.usersdata)
            setPageCount(response.data.Pagination.pageCount)
        
          // console.log(response.data.Pagination.pageCount);
           
        } else {
            console.log("error for get user data");
        }
    }
     // pagination
  // handle prev btn
  const handlePrevious = ()=>{
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }
    //user delete
    const deleteUser = async (id) => {

        console.log(id);
        const response = await deletefunc(id);
        if (response.status === 200) {
            setDLtdata(response.data);
            userGet();

        } else {
            toast.error("error")
        }
    }
     // export user
  const exportuser = async()=>{
    const response = await exporttocsvfunc();
    if(response.status === 200){
     window.open(response.data.downloadUrl,"blank")
    }else{
      toast.error("error !")
    }
    }
    useEffect(() => {
        setTimeout(() => {

            setDLtdata(false)
        }, 1200)
    });
    useEffect(() => {
        setTimeout(() => {
            userGet();

            setShowSpin(false)
        }, 500)
        //when we type automaticallly change data according to search
    }, [search, gender, status, sort]);
    return (
        <>
            {
                useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{
                    useradd.fname.toUpperCase()
                }
                    __Succesfully Add
                </Alert>
                    : ""
            }
            {
                update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Succesfully Update</Alert> : ""
            }
            {
                deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.fname.toUpperCase()} Succesfully Deleted</Alert> : ""
            }

            <div className="container">
                <div className="main_div">
                    {/* Search add button */}
                    <div className="search_add mt-4 d-flex justify-content-between">
                        <div className="search col-lg-4">
                            <Form className="d-flex">
                                <Form.Control

                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="success" className='search_btn'>Search</Button>
                            </Form>
                        </div>
                        <div className="add_btn">

                            <Button variant="primary" onClick={adduser} className='search_btn'>  <i className="fa-solid fa-plus"></i>&nbsp;Add User</Button>
                        </div>
                    </div>
                    {/* export .gender,status */}
                    <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
                        <div className="export_csv">
                            <Button className='export_btn' onClick={exportuser}>Export To Csv</Button>
                        </div>
                        <div className="filter_gender">
                            <div className="filter"></div>
                            <h3>Filter By Gender</h3>
                            <div className="gernder d-flex justify-content-around">
                                <Form.Check
                                    type={"radio"}
                                    label={`All`}
                                    name="gender"
                                    value={"All"}
                                    onChange={(e) => setGender(e.target.value)}
                                    defaultChecked
                                />

                                <Form.Check
                                    type={"radio"}
                                    label={`Male`}
                                    name="gender"
                                    value={"Male"}
                                    onChange={(e) => setGender(e.target.value)}


                                />
                                <Form.Check
                                    type={"radio"}
                                    label={`Female`}
                                    name="gender"
                                    value={"Female"}
                                    onChange={(e) => setGender(e.target.value)}


                                />
                            </div>
                        </div>
                        {/* Short by value */}
                        <div className="filter_newols">
                            <h3>Short by Value</h3>
                            <Dropdown className="text-center">
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                    <i className="fa-solid fa-sort"></i>
                                </Dropdown.Toggle>


                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                        {/* filter by status */}
                        <div className="filter_status">
                            <div className="status">
                                <h3>Filter By status</h3>
                                <div className="status_radio d-flex justify-content-around flex-wrap">
                                    <Form.Check
                                        type={"radio"}
                                        label={`All`}
                                        name="status"
                                        value={"All"}
                                        onChange={(e) => setStatus(e.target.value)}
                                        defaultChecked
                                    />

                                    <Form.Check
                                        type={"radio"}
                                        label={`Active`}
                                        name="status"
                                        value={"Active"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <Form.Check
                                        type={"radio"}
                                        label={`InActive`}
                                        name="status"
                                        value={"InActive"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {
                    showspin ? <Spiner /> : <Tables userdata={userdata}
                        deleteUser={deleteUser}
                        userGet={userGet} 
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        page={page}
                        pageCount={pageCount}
                        setPage={setPage}
                        />
                }

            </div>
        </>
    )
}

export default Home
