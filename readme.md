## categories

#### example request http://localhost:5001/api/categories - GET ALL categories

#### example request http://localhost:5001/api/categories?category=Drinks - GET ALL subcategories by categoryId

## DISHES

#### example request http://localhost:5001/api/dishes - GET - get all dishes

##### example request http://localhost:5001/api/dishes?category=Drinks&q=USA - GET - get all dishes with query

##### allowed query: category, subcategory, q (search string)

#### example request http://localhost:5001/api/dishes - POST - create 1 dish /

#### example request http://localhost:5001/api/dishes - PUT - update 1 dish / id in body - required in this request

#### example request http://localhost:5001/api/dishes/6453fe613b229fb1d201d915 - GET 1 dish by ID

#### example request http://localhost:5001/api/dishes/6453ff148ac78a327c1fe933 - DELETE 1 dish by ID

---

## TABLES (reservation)

> ##### Get all tables info
>
> GET - http://localhost:5001/api/restaurant/tables

<details><summary>response example</summary>

```
[
    {
        "number": "T-01",
        "tableLimit": 6,
        "reserved": false,
        "reservationInfo": [],
        "id": "645fc5914684cada592ce0b0"
    },
    {
        "number": "T-02",
        "tableLimit": 6,
        "reserved": false,
        "reservationInfo": [
            {
                "date": "2023-05-13",
                "time": "18:00",
                "clientName": "TEST",
                "phoneNumber": "675871098012",
                "email": "kjhask@gmail.com",
                "visitTag": "bdaaday",
                "notes": "ajwoidhawiudhawi",
                "id": "645fcf78c69d6a01d0e04298"
            },
            {
                "date": "2023-05-13",
                "time": "18:00",
                "clientName": "TEST",
                "phoneNumber": "675871098012",
                "email": "kjhask@gmail.com",
                "visitTag": "bdaaday",
                "notes": "ajwoidhawiudhawi",
                "id": "645fcf7ac69d6a01d0e0429a"
            }
        ],
        "id": "645fc59a4684cada592ce0b2"
    },
]

```

</details>

> ##### Get All free tables
>
> GET - http://localhost:5001/api/restaurant/tables/free

<details><summary>response example</summary>

```
[
    {
        "number": "T-01",
        "id": "645fc5914684cada592ce0b0"
    },
    {
        "number": "T-03",
        "id": "645fc5ea4684cada592ce0b4"
    },
    {
        "number": "T-04",
        "id": "645fc5ef4684cada592ce0b6"
    },
    {
        "number": "T-05",
        "id": "645fc5f44684cada592ce0b8"
    },
    {
        "number": "T-06",
        "id": "645fc5f84684cada592ce0ba"
    },

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

or

{
    "message": "No reservations for this table"
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
{
    "number": "T-12",
    "tableLimit": 2
}

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

#### example request http://localhost:5001/api/orders - GET - get all orders

#### example request http://localhost:5001/api/orders/645e2c4a66bbb2ae16af76e3 - GET - get one order by id

#### example request http://localhost:5001/api/orders - POST - create one order

#### example request http://localhost:5001/api/orders - PUT - update one order

#### example request http://localhost:5001/api/orders/645e2c4a66bbb2ae16af76e3 - DELETE - get one order by id

---
