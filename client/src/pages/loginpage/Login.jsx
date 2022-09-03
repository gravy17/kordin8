import React, {useState} from "react";
import { SFixedContainer } from "../../components/Containers/styles";
import Form from "../../components/Form/Form";

const SERVER_URL = "http://localhost:3001";

const SignIn = () => {

  const [user, setUser] = useState('admin')

    const onSubmitHandler = (form, callback, event) => {
        // console.log("Sign In submitted: ", form);
        // callback();
        fetch(`${SERVER_URL}/${user}/login`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ formArr
                // email:email,
                // password:password
              }),
            })
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
            // event.preventDefault();
            // event.stopPropagation();
          };
    

    return (
        <SFixedContainer size={275}>
           
            <Form
                title={"Sign In"}
                formArr={formArr}
                submitBtn={"Sign In"}
                onSubmit={onSubmitHandler}
                redirect={{
                    label: "Don't have an account?",
                    link: {
                        label: "Register",
                        to: "/register",
                    },
                }}
            />
{/* <br/>
            <br/>
            <div>  
            <select value={user} onChange={(e) => setUser(e.target.value)} >
           <option  value="admin">Admin</option>
           <option  value="customer">Customer</option>
           <option  value="agent">Agent</option>
           </select>
           </div>
           <br/> */}
        </SFixedContainer>
    );
};

const formArr = [
    {
        label: "Email",
        name: "email",
        type: "text",
    },
    {
        label: "Password",
        name: "password",
        type: "password",
    },
    {
      label: "Dropdown",
      name:"user",
      option: [
        {
          value: "admin",
          label: "Admin",
        },
        {
          value: "agent",
          label: "Agent",
        },
        {
          value: "customer",
          label: "Customer",
        },
      ],
    },
];

export default SignIn;






































// import React from "react";
// import { useState, useEffect } from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Form from "../../components/Form/Form"


// const SERVER_URL = "http://localhost:3001";

// function Login() {
 

//   const [formErrors, setFormErrors] = useState({});

//   const [isSubmit, setIsSubmit] = useState(false);

//   const [user, setUser] = useState('admin')
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("");

  // const handleChange = (e) => {
  //   // console.log(e.target);
  //   // const { name, value } = e.target;
  //   // setFormValues({ ...formValues, [name]: value });
  // // console.log ( setFormValues({ ...formValues, [name]: value }));
  //   // setIsSubmit(true);
  //   // setUser(e.target.value)
  // };

  // const handleSubmit = (event) => {
  //   // setFormErrors(validateForm(email, password));
  //   // const data = {formValues}
  //   // console.log(data1);
  //   fetch(`${SERVER_URL}/${user}/login`, {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       // formValues
  //       email:email,
  //       password:password
  //       // email: "superadmin@kordin8.com",
  //       //   password: "superpassword",
  //     }),
  //   })
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
  //   event.preventDefault();
  //   event.stopPropagation();
  // };
  
  
  

  

  // const validateForm = (email,password) => {
    
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!email) {
  //     errors.email = "Email is required!";
  //   } else if (!regex.test(email)) {
  //     errors.email = "This is not a valid email format!";
  //   }
  //   if (!password) {
  //     errors.password = "Password is required";
  //   } else if (password.length < 6) {
  //     errors.password = "Password must be more than 4 characters";
  //   } else if (password.length > 15) {
  //     errors.password = "Password cannot exceed more than 15 characters";
  //   }
  //   return errors;
  // };



  

//   return (
//     <div className="container">
    
//         <form onSubmit={handleSubmit}>
//           {/* <h1>Login Details</h1> */}
//           <div className="ui divider"></div>
//           <div className="ui form">
        
//             <Form/>
        
//           </div>
//         </form>
//     </div>
//   );
// }

// export default Login;



 // const initialValues = { email: "", password: ""};

  // const [formValues, setFormValues] = useState(initialValues);
  // console.log(initialValues);

  // <FormControl sx={{ m: 1, minWidth: 80 }}>
  //             <InputLabel id="demo-simple-select-autowidth-label">
  //               Designation
  //             </InputLabel>
  //             <Select
  //               labelId="demo-simple-select-autowidth-label"
  //               id="demo-simple-select-autowidth"
  //               value={user}
  //               onChange={(e) => setUser(e.target.value)}
  //               autoWidth
  //               label="Designation"
  //             >
  //               <MenuItem value="admin">Admin</MenuItem>
  //               <MenuItem  value="customer">Customer</MenuItem>
  //               <MenuItem value="agent">Agent</MenuItem>
  //             </Select>
  //             </FormControl>

  //  const successMsg = () => {
// if (Object.keys(formErrors).length === 0 && isSubmit) {
  
// return toast(` <div className="ui message success">Signed in successfully</div>`
//   )
// }
//   }

// email: "superadmin@kordin8.com",
  //       password: "superpassword",

  // useEffect(() => {
  //   // console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(email,password);
  //   }
  // }, [email, password]);

   {/* <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p>{formErrors.email}</p>
       
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>{formErrors.password}</p>
    */}

     {/* <div>
              
              <label>Role: </label>
             <select name="role" value={user} onChange={(e) => setUser(e.target.value)} >
        <option  value="admin">Admin</option>
        <option  value="customer">Customer</option>
        <option  value="agent">Agent</option>
      </select>
            </div> */}


            // <br />
            // <br />
            // <button type="submit" >Login</button>
         