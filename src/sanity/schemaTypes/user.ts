// // schemas/user.js
// export default {
//     name: 'user',
//     title: 'User',
//     type: 'document',
//     fields: [
//       {
//         name: 'email',
//         title: 'Email',
//         type: 'string',
//       },
//       {
//         name: 'username',
//         title: 'username',
//         type: 'string',
//       },
//       {
//         name: 'name',
//         title: 'Name',
//         type: 'string',
//       },
//       {
//         name: 'password',
//         title: 'Password',
//         type: 'string',
//       },
//       {
//         name: 'orders',
//         title: 'Orders',
//         type: 'array',
//         of: [{ type: 'reference', to: [{ type: 'order' }] }],
//       },
//     ],

//   }
  


// schemas/user.js
export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      hidden: true, // Hide password field in Sanity Studio for security
    },
    {
      name: 'orders',
      title: 'Orders',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'order' }] }],
      readOnly: true, // Prevent manual editing of orders in Sanity Studio
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      readOnly: true, // Automatically set this field, not editable
      initialValue: new Date().toISOString(), // Set current date as default
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      readOnly: true, // Automatically updated, not editable
    },
  ],
};