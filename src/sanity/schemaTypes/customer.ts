// schemas/customer.js
const CustomerSchema = {
    name: 'customer',
    title: 'Customer',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone',
        type: 'string',
      },
    ],
  }
  
  export default CustomerSchema