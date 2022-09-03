import React from 'react'

function Label(props) {
  return (
    <div> <label htmlFor={props.children}>{props.children}</label></div>
  )
}


export default Label
