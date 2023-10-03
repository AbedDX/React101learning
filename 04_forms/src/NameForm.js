import{useState} from "react";

const NameForm = (props) => {
    const [state, setState] = useState({
      firstname: "",
      lastname: "",
    });
  
    const onChange = (event) => {
        setState((state) => {
                return {
                        ...state,
                        [event.target.name]:event.target.value
                }
        })
    };
  
    const onSubmit = (event) => {
        event.preventDefault();
        let name = state.firstname+" "+state.lastname;
        props.setGreeting(name);
    };


return(
    <form onSubmit={onSubmit}>
        <label htmlFor="firstname">First Name: </label>
        <input type="text"
        name="firstname"
        id="firstname"
        onChange={onChange}
        value={StaticRange.firstname}/>
        <br/>
        <label htmlFor="lastname">Last Name: </label>
        <input type="text"
        name="lastname"
        id="lastname"
        onChange={onChange}
        value={StaticRange.lastname}/>
        <br/>
        <button type="submit" value={onSubmit}>Submit</button>
    </form>
    )
}
export default NameForm;