import React, { createContext, useState } from 'react'
//create context
export const addData = createContext();
export const updateData = createContext();
export const dltdata=createContext();

const ContextProvider = ({ children }) => {
    const [update, setUpdate] = useState("");
    const [useradd, setUseradd] = useState("");
    const [deletedata,setDLtdata]=useState("");
    return (
        <div>
            <>
                <addData.Provider value={{ useradd, setUseradd }}>
                <updateData.Provider value={{ update, setUpdate }}>
                    <dltdata.Provider value={{deletedata,setDLtdata}}>
                    {children}
                    </dltdata.Provider>
                    </updateData.Provider>
                </addData.Provider>
            </>
        </div>
    )
}
export default ContextProvider

/*
import React, { createContext, useState } from 'react'

export const addData = createContext();


const ContextProvider = ({ children }) => {

    const [useradd, setUseradd] = useState("");
    

    return (
        <>
            <addData.Provider value={{ useradd, setUseradd }}>
              
                        {children}
            </addData.Provider>
        </>
    )
}

export default ContextProvider
*/