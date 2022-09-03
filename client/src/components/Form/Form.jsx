import React, { useState, useMemo } from "react";
import {
  SRedirectLink,
  SButton,
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SLabel,
  SRedirect,
  SRedirectLabel,
} from "../Form/styles";

const prepareForm = (formArr) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
};

const Form = ({ title, formArr, submitBtn, onSubmit, redirect }) => {
  const initialForm = useMemo(() => prepareForm(formArr), [formArr]);
  const [form, setForm] = useState(initialForm);

  const onChangeHandler = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmitHandler = () => onSubmit(form, () => setForm(initialForm));

  const hasRedirect = !!redirect;
  return (
    <SForm autoComplete={"off"}>
      <SFormTitle>{title}</SFormTitle>
      {console.log(formArr)}
      {formArr.map(({ label, name, type, option }, index) =>
        label === "Dropdown" ? (
          <>
            <select name={name} id="">
              {option.map((el) => (
                <option value={el.value}>{el.label}</option>
              ))}
            </select>
          </>
          
        ) : (
          <SFormControl key={index}>
            <SLabel htmlFor={name}>{label}</SLabel>
            <SInput
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={(e) => onChangeHandler(e)}
            />
          </SFormControl>
        )
      )}

      <SButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSubmitHandler();
        }}
      >
        {submitBtn}
      </SButton>
      {hasRedirect && (
        <SRedirect>
          <SRedirectLabel>{redirect.label}&nbsp;</SRedirectLabel>
          <SRedirectLink to={redirect.link.to}>
            {redirect.link.label}
          </SRedirectLink>
        </SRedirect>
      )}
    </SForm>
  );
};

Form.defaultProps = {
  title: "Sign In",
  formArr: [
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
  ],
  submitBtn: "Sign In",
  onSubmit: (form) => console.log(form),
  redirect: null,
};

export default Form;

// fetch(`${SERVER_URL}/${user}/login`, {
//   method: "POST",
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     <SInput/>
//     // email:Form.defaultProps.formArr[0].name,
//     // password:Form.defaultProps.formArr[1].name
//   }),
// })
// .then((response) => response.json())
// .then((result) => console.log(result))
// .catch((error) => console.log("error", error));
// event.preventDefault();
// event.stopPropagation();},
