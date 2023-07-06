import dayjs from "dayjs";

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

export const generatedDate = () => {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const startOfQuarterMonth = today.subtract(2, "month").startOf("month");
  const startOfYear = today.startOf("year");
  const endOfYear = today.endOf("year");

  return {
    today,
    startOfMonth,
    endOfMonth,
    startOfQuarterMonth,
    startOfYear,
    endOfYear,
  };
};
