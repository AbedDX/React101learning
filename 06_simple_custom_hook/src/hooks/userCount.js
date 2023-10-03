import {useState} from "react"

const useState = (initialState = 0) =>{ 
    const [value,setState] = useState(initialState);
    const add = () => setValue(value =>value + 1);
    const subtract = () => setValue(value => - 1);
    return [value,add,subtract]
}

export default userCount;