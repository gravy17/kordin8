 


import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from "../../components/formInput/FormInput";
import Label from "../../components/label/Label";

const SERVER_URL = "http://localhost:3001";

function Register() {
  // const initialValues = { email: "", password: ""};

  // const [formValues, setFormValues] = useState(initialValues);
  // console.log(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState('admin')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  // const handleChange = (e) => {
  //   // console.log(e.target);
  //   // const { name, value } = e.target;
  //   // setFormValues({ ...formValues, [name]: value });
  // // console.log ( setFormValues({ ...formValues, [name]: value }));
  //   // setIsSubmit(true);
  //   // setUser(e.target.value)
  // };

  const handleSubmit = (event) => {
    setFormErrors(validateForm(email, password));
    // const data = {formValues}
    // console.log(data1);
    fetch(`${SERVER_URL}/${user}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // formValues
        email:email,
        password:password
        // email: "superadmin@kordin8.com",
        //   password: "superpassword",
      }),
    })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
    event.preventDefault();
    event.stopPropagation();
  };
  
  
  

  // email: "superadmin@kordin8.com",
  //       password: "superpassword",

  // useEffect(() => {
  //   // console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(email,password);
  //   }
  // }, [email, password]);

  const validateForm = (email,password) => {
    
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be more than 4 characters";
    } else if (password.length > 15) {
      errors.password = "Password cannot exceed more than 15 characters";
    }
    return errors;
  };

  const successMsg = () => {
if (Object.keys(formErrors).length === 0 && isSubmit) {
  
return toast(` <div className="ui message success">Signed in successfully</div>`
  )
}
  }

  

  return (
    <div className="container">
      {/* {SuccessMsg()} */}
        <form onSubmit={handleSubmit}>
          <h1>Registration Form</h1>
          <div className="ui divider"></div>
          <div className="ui form">
         
            <div>
              <Label HtmlFor={"lastname"}>Last Name</Label>
              <FormInput type={"text"} placeholder={"Last Name"} name={"lastname"}/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <div>
              <FormInput/>
            </div>
            <br />
            <button type="submit" >Register</button>
            
          </div>
        </form>
    </div>
  );
}

export default Register;

    // lastName
    // firstName
    // bvn
    // dob
    // email
    // phone
    // address
    // govtIdRef
    // maxOrders
    // service
    // password
    // confirm_password