export const filterWithCategory = (dishes, arrayCategory) => {
  return dishes.filter((dish) =>
    arrayCategory.includes(dish.category.id.toString())
  );
};

export const generatedAmountDishes = (dishes) => {
  const dataMap = {};

  let totalAmount = 0;

  for (const dish of dishes) {
    totalAmount += dish.amount;
  }

  for (const dish of dishes) {
    const { title, amount } = dish;

    if (dataMap.hasOwnProperty(title)) {
      dataMap[title].data[0] += amount;
    } else {
      dataMap[title] = { label: title, data: [amount] };
    }
  }

  const dataArray = Object.values(dataMap);

  for (const data of dataArray) {
    data.data[0] = Math.round((data.data[0] / totalAmount) * 100);
    data.data.push(100);
  }

  dataArray.sort((a, b) => b.data[0] - a.data[0]);

  return dataArray.slice(0, 4);
};

export const generatedAmountDishesByParentCategory = (dishes) => {
  const filteredObjects = [];
  const categoryMap = {};
  let totalAmount = 0;

  for (const dish of dishes) {
    totalAmount += dish.amount;
  }

  dishes.forEach((obj) => {
    const parentId = obj.category.parent.id;
    const label = obj.category.parent.title;
    const amount = obj.amount;

    if (!categoryMap[parentId]) {
      categoryMap[parentId] = {
        label: label,
        data: [amount],
      };
    } else {
      categoryMap[parentId].data[0] += amount;
    }
  });

  for (const parentId in categoryMap) {
    filteredObjects.push({
      label: categoryMap[parentId].label,
      data: categoryMap[parentId].data,
    });
  }

  for (const data of filteredObjects) {
    data.data[0] = Math.round((data.data[0] / totalAmount) * 100);
    data.data.push(100);
  }

  filteredObjects.sort((a, b) => b.data[0] - a.data[0]);
  return filteredObjects.slice(0, 4);
};

export const percentageChange = ({ totalDay, totalRange, averageDays }) => {
  if (!totalRange) return 100;
  const average = totalRange / averageDays;

  return Math.round(((totalDay - average) / average) * 100);
};

export const percentageCancelAllCount = ({ cancelledOrders, totalOrders }) => {
  if (!cancelledOrders) return 0;

  return Math.round((cancelledOrders / (totalOrders + cancelledOrders)) * 100);
};

export const compareCancellationPercentage = ({
  previousMonthCancelled,
  previousMonthTotal,
  currentMonthCancelled,
  currentMonthTotal,
}) => {
  if (!previousMonthCancelled) return 100;

  const previousMonthPercentage =
    (previousMonthCancelled / (previousMonthTotal + previousMonthCancelled)) *
    100;
  const currentMonthPercentage =
    (currentMonthCancelled / (currentMonthTotal + currentMonthCancelled)) * 100;

  return currentMonthPercentage - previousMonthPercentage;
};

export const aggregateDishes = [
  {
    $lookup: {
      from: "orders",
      localField: "orderID",
      foreignField: "_id",
      as: "orderData",
    },
  },
  {
    $unwind: "$orderData",
  },
  {
    $project: {
      dishes: "$orderData.dishes",
    },
  },
  {
    $unwind: "$dishes",
  },
  {
    $lookup: {
      from: "dishes",
      localField: "dishes.dishID",
      foreignField: "_id",
      as: "dishData",
    },
  },
  {
    $unwind: "$dishData",
  },
  {
    $lookup: {
      from: "categories",
      localField: "dishData.category",
      foreignField: "_id",
      as: "categories",
    },
  },
  {
    $lookup: {
      from: "categories",
      localField: "categories.parent",
      foreignField: "_id",
      as: "parentCategory",
    },
  },
  {
    $project: {
      category: {
        id: "$dishData.category",
        title: { $arrayElemAt: ["$categories.title", 0] },
        parent: {
          id: { $arrayElemAt: ["$parentCategory._id", 0] },
          title: { $arrayElemAt: ["$parentCategory.title", 0] },
        },
      },
      amount: "$dishes.amount",
      title: "$dishes.title",
    },
  },
];

export const aggregateDishesTime = ({ dayFrom, dayTo, status }) => {
  return [
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: dayFrom,
              $lte: dayTo,
            },
          },
          {
            status,
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        totalPriceAll: { $sum: "$totalPrice" },
        totalCount: { $sum: 1 },
      },
    },
  ];
};

export const aggregateRangeMonth = ({ dayFrom, dayTo, status }) => {
  return [
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: dayFrom,
              $lte: dayTo,
            },
          },
          {
            status,
          },
        ],
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalPriceAll: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];
};

export const aggregateRangeQuarter = ({ dayFrom, dayTo, status }) => {
  return [
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: dayFrom,
              $lte: dayTo,
            },
          },
          {
            status,
          },
        ],
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalPriceAll: { $sum: "$totalPrice" },
      },
    },
  ];
};
