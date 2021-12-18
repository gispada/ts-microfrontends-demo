export const config = [
  [
    {
      label: 'Name',
      value: 'name',
      type: 'input',
      required: true
    },
    {
      label: 'Surname',
      value: 'surname',
      type: 'input',
      required: true
    }
  ],
  [
    {
      label: 'Address',
      value: 'address',
      type: 'input'
    },
    {
      label: 'City',
      value: 'city',
      type: 'input'
    }
  ],
  [
    {
      label: 'Email',
      value: 'email',
      type: 'input',
      required: true
    },
    {
      label: 'Telephone',
      value: 'telephone',
      type: 'telephone'
    }
  ]
]

export const initialValues = {
  name: 'John',
  surname: 'Doe',
  address: 'Fifth Avenue 82',
  city: 'New York',
  email: 'john.doe@company.com'
}
