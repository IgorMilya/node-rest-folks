## TABLES (reservation)

#### example request http://localhost:5001/api/restaurant/tables/

---

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
