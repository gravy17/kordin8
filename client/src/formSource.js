export const adminInputs = [
  {
    id: 1,
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
  {
    id: 2,
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    id: 3,
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "johndoe@example.com",
  },
  {
    id: 4,
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "08011234567",
  },
  {
    id: 5,
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "123 Main St",
  },
  {
    id: 6,
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "123Secret",
  },
  {
    id: 7,
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "123Secret",
  },
]

export const agentInputs = [
  {
    id: 1,
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
  {
    id: 2,
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    id: 3,
    name: "dob",
    label: "Date of Birth",
    type: "date",
    placeholder: "dd/mm/yyyy",
  },
  {
    id: 4,
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "johndoe@example.com",
  },
  {
    id: 5,
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "08011234567",
  },
  {
    id: 6,
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "123 Main St",
  },
  {
    id: 7,
    name: "govtIdRef",
    label: "Govt Id No.",
    type: "text",
    placeholder: "DJ345678",
  },
  {
    id: 8,
    name: "service",
    label: "Service",
    type: "select",
    options: [
      { value:"Catering", label:"Catering" },
      { value:"Delivery", label:"Delivery" },
      { value:"Pickup", label:"Pickup" },
      { value:"Repairs", label:"Repairs" },
      { value:"Crafts", label:"Crafts" },
      { value:"Events", label:"Events" },
      { value:"Security", label:"Security" },
      { value:"Products", label:"Products" },
    ],
  },
  {
    id: 9,
    name: "maxOrders",
    label: "Maximum Active Orders",
    type: "number",
    placeholder: "Number of orders you can handle at a time",
  },
  {
    id: 12,
    name: "bvn",
    label: "BVN",
    type: "text",
    placeholder: "3234356576",
  },
  {
    id: 10,
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "123Secret",
  },
  {
    id: 11,
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "123Secret",
  },
]

export const customerInputs = [
  {
    id: 1,
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    id: 2,
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
  {
    id: 4,
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "johndoe@example.com",
  },
  {
    id: 5,
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "08011234567",
  },
  {
    id: 10,
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "123Secret",
  },
  {
    id: 11,
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "123Secret",
  },
]
  
export const orderInputs = [
  {
    id: 1,
    name: "orderType",
    label: "Order Type",
    type: "select",
    options: [
      { value:"Catering", label:"Catering" },
      { value:"Delivery", label:"Delivery" },
      { value:"Pickup", label:"Pickup" },
      { value:"Repairs", label:"Repairs" },
      { value:"Crafts", label:"Crafts" },
      { value:"Events", label:"Events" },
      { value:"Security", label:"Security" },
      { value:"Products", label:"Products" },
    ]
  },
  {
    id: 2,
    name: "recipient",
    label: "Recipient details",
    type: "text",
    placeholder: "Name, Address, Phone No."
  },
  {
    id: 3,
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Any additional info / special instructions",
  },
  {
    id: 4,
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Suggest a price that an agent will likely agree on"
  }
]