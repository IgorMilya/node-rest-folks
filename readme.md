## DISHES

#### example request http://localhost:5001/api/restaurant/dishes - GET - get all dishes

#### example request http://localhost:5001/api/restaurant/dishes - POST - create 1 dish /

#### example request http://localhost:5001/api/restaurant/dishes - PUT - update 1 dish / id in body - required in this request

#### example request http://localhost:5001/api/restaurant/dishes/by_category/meat - GET all dishes by category (category - "meat" in example)

#### example request http://localhost:5001/api/restaurant/dishes/by_category/meat/pork - GET all dishes by category and subcategory (category - "meat" , subcategory - "pork" in example)

#### example request http://localhost:5001/api/restaurant/dishes/6453fe613b229fb1d201d915 - GET 1 dish by ID

#### example request http://localhost:5001/api/restaurant/dishes/6453ff148ac78a327c1fe933 - DELETE 1 dish by ID

#### example request http://localhost:5001/api/restaurant/dishes/categories/all - GET all categories - array

#### example request http://localhost:5001/api/restaurant/dishes/categories/meat - GET all subcategories in categories (category - "meat" in example)

---

## TABLES (reservation)

> ##### Get all tables info
>
> GET - http://localhost:5001/api/restaurant/tables

<details><summary>response example</summary>

```
[
  {
    "_id": "64581c123479f2dbb85c8bcb",
    "number": "T-01",
    "reserved": false,
    "reservationInfo": [
      {
        "date": "2023-05-29",
        "time": "16:00",
        "clientName": "Oleksandr",
        "phoneNumber": "123121323",
        "email": "kjhasawdawdk@gmail.com",
        "visitTag": "birthday",
        "notes": "ajwoidawda wdhawiudhawi",
        "_id": "64595f624ef0d5a27f83b09b"
      }
    ],
    "__v": 0
  },
  {
    "_id": "64581c173479f2dbb85c8bcd",
    "number": "T-02",
    "reserved": true,
    "reservationInfo": [],
    "__v": 0
  }
]

```

</details>

> ##### Get the reservation `time` for a specific table for the current date by `table id`
>
> GET - http://localhost:5001/api/restaurant/tables/reservation/6459612787a543d932c11031

<details><summary>response example</summary>

```
{
    "message": "Table T-01 is currently reserved for the following hours:",
    "tableReservations": [
        "16:00"
    ]
}

```

</details>

> ##### Change table `status` by `table id`
>
> PUT - http://localhost:5001/api/restaurant/tables/6459612787a543d932c11031

> ##### Add new `table`
>
> POST - http://localhost:5001/api/restaurant/tables

<details><summary>body example</summary>

```
{ "number": "T-10"}

```

</details>

> ##### Add `new reservation` info to the table by `table id`
>
> POST - http://localhost:5001/api/restaurant/tables/reservation/6459612787a543d932c11031

<details><summary>body example</summary>

```
{
    "date": "2023-05-010",
    "time": "10:00",
    "clientName": "Olexandr",
    "phoneNumber": "123",
    "email": "kjhask@gmail.com",
    "visitTag": "bday",
    "notes": "ajwoidhawiudhawi"
}

```

</details>

> ##### Delete `reservation` info from the table by `reservation id` and `table number`
>
> DELETE - http://localhost:5001/api/restaurant/tables/reservation/T-01/6459612787a543d932c11034

> ##### Delete `table` by `table id`
>
> DELETE - http://localhost:5001/api/restaurant/tables/6459612787a543d932c11031

---

## ORDERS

#### example request http://localhost:5001/api/restaurant/orders - GET - get all orders

#### example request http://localhost:5001/api/restaurant/orders/645e2c4a66bbb2ae16af76e3 - GET - get one order by id

#### example request http://localhost:5001/api/restaurant/orders - POST - create one order

#### example request http://localhost:5001/api/restaurant/orders - PUT - update one order

#### example request http://localhost:5001/api/restaurant/orders/645e2c4a66bbb2ae16af76e3 - DELETE - get one order by id

---

## categories

#### example request http://localhost:5001/api/restaurant/categories
