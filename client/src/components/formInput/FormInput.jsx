
import React from 'react'


const FormInput = (props) => {
  return (
    <div>
      <input {...props.children}/>
   
              {/* <input
                type={props.children}
                id={props.children}
                name={props.children}
                placeholder={props.children}
                value={props.children}
                onChange={props.children}
              /> */}
              </div>
  )
}



export default FormInput