export const createOrder = {
  orderType: 'Dine In',
  table: 'Table 1',
  orderNumber: '908098',
  description: 'Some description',
  dishes: [
    { dishId: '675765765', quantity: 6 },
    { dishId: '675765765', quantity: 6 },
  ],
}

export const getOrder = [
  {
    orderType: 'Dine In',
    table: 'Table 1',
    orderNumber: '908098',
    description: 'Some description',
    dishes: [
      {
        dishID: '645a8c14bdac7211baf9aa07',
        price: 569,
        quantity: 2,
        _id: '6469237d1e69d5e400d3b0b2',
        title: 'BBQ meter',
      },
      {
        dishID: '645a8c14bdac7211baf9aa07',
        price: 569,
        quantity: 2,
        _id: '6469237d1e69d5e400d3b0b2',
        title: 'BBQ meter',
      },
    ],
  },
  {
    orderType: 'Dine In',
    table: 'Table 1',
    orderNumber: '908098',
    description: 'Some description',
    dishes: [
      { dishId: '675765765', quantity: 6, price: 231 },
      { dishId: '675765765', quantity: 6, price: 213 },
    ],
  },
]

const bills = [
  {
    id: '123123',
    orderType: 'Dine In',
    table: 'Table 1',
    orderNumber: '908098',
    description: 'Some description',
    status: 'opened | closed', /// db - default ,
    total: '1213123',
    tip: '0', /// db - default ,
    email: 'email@asda.com', /// db - default ,
    paymentMethod: 'cash | mastercard', /// db - default ,
    dishes: [
      { dishId: '675765765', quantity: 6, price: 23 },
      { dishId: '675765765', quantity: 6, price: 20 },
    ],
  },
]
