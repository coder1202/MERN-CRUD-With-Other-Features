/*import axios from "axios";
//must export
export const commonrequest = async(methods, url, body, header) => {
    let config = {
        method: methods,
        url,
        headers: header ?
            header : { "Content-Type": "application/json" },
        data: body

    }

    //axios instance
    return axios(config).then((data) => {
        return data
    }).catch((e) => {
        return e
    })
}
*/
import axios from "axios";

export const commonrequest = async(methods, url, body, header) => {
    let config = {
        method: methods,
        url,
        headers: header ?
            header : {
                "Content-Type": "application/json"
            },
        data: body
    }

    //axios instance
    return axios(config).then((data) => {
        return data
    }).catch((error) => {
        return error
    })
}