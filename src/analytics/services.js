import { CategoryDAL } from "../categories/CategoriesDAL.js";
import { BillsDAL } from "../bills/BillsDAL.js";
import {
  compareCancellationPercentage,
  filterWithCategory,
  generatedAmountDishes,
  generatedAmountDishesByParentCategory,
  generatedDate,
  percentageCancelAllCount,
  percentageChange,
} from "./utils.js";
import dayjs from "dayjs";
import { OrderDAL } from "../orders/OrdersDAL.js";
import { createError } from "../utils/error.js";
import {
  aggregateRangeDayInMonth,
  aggregateDishes,
  aggregateRangeYearInMonth,
  aggregateDishesTime,
  aggregateRangeOrderType,
} from "./aggregate.utils.js";

const getTopSalesCategory = async ({ category }) => {
  const parentCategory = await CategoryDAL.findByOne({ _id: category });
  const subcategory = await CategoryDAL.findSubCategoryByCategory(category);
  const subcategoryID = subcategory.map((item) => item.id);

  const data = await BillsDAL.findAggregate(aggregateDishes);

  const categoriesAnalytics = {};

  if (parentCategory) {
    categoriesAnalytics.labels = [parentCategory.title];

    const filterWithCategories = filterWithCategory(data, subcategoryID);

    categoriesAnalytics.datasets = generatedAmountDishes(filterWithCategories);
  } else {
    categoriesAnalytics.labels = ["Top category"];
    categoriesAnalytics.datasets = generatedAmountDishesByParentCategory(data);
  }

  return categoriesAnalytics;
};

const billsTotalPriceAndCountWithRange = async ({ dayFrom, dayTo, status }) => {
  const data = await BillsDAL.findAggregate(
    aggregateDishesTime({ dayFrom, dayTo, status })
  );

  return data.length ? data[0] : [];
};
const ordersTotalPriceAndCountWithRange = async ({
  dayFrom,
  dayTo,
  status,
}) => {
  const data = await OrderDAL.findAggregate(
    aggregateDishesTime({ dayFrom, dayTo, status })
  );

  return data.length ? data[0] : [];
};

const general = async () => {
  const today = dayjs();

  const morning = today.startOf("day").toDate();
  const night = today.endOf("day").toDate();

  const startOfMonth = today.startOf("month").toDate();
  const endOfMonth = today.endOf("month").toDate();

  const yesterday = dayjs().subtract(1, "day").endOf("day").toDate();
  const sevenDaysAgo = dayjs().subtract(6, "day").startOf("day").toDate();

  const previousMonth = today.subtract(1, "month");
  const startPreviousOfMonth = previousMonth.startOf("month").toDate();
  const endPreviousOfMonth = previousMonth.endOf("month").toDate();

  const dataToday = await billsTotalPriceAndCountWithRange({
    dayFrom: morning,
    dayTo: night,
    status: "closed",
  });

  const dataSevenDays = await billsTotalPriceAndCountWithRange({
    dayFrom: sevenDaysAgo,
    dayTo: yesterday,
    status: "closed",
  });

  const TotalRevenue = {
    title: "Total revenue",
    value: dataToday?.totalPriceAll || 0,
    percentage: percentageChange({
      totalDay: dataToday?.totalPriceAll,
      totalRange: dataSevenDays?.totalPriceAll,
      averageDays: dataSevenDays?.totalCount,
    }),
    period: "Daily",
  };

  const TotalOrders = {
    title: "Total orders",
    value: dataToday?.totalCount || 0,
    percentage: percentageChange({
      totalDay: dataToday?.totalCount,
      totalRange: dataSevenDays?.totalCount,
      averageDays: dataSevenDays?.totalCount,
    }),
    period: "Daily",
  };

  const dataMonth = await billsTotalPriceAndCountWithRange({
    dayFrom: startOfMonth,
    dayTo: endOfMonth,
    status: "closed",
  });

  const dataPreviousMonth = await billsTotalPriceAndCountWithRange({
    dayFrom: startPreviousOfMonth,
    dayTo: endPreviousOfMonth,
    status: "closed",
  });

  const averageMonth = Math.round(
    (dataMonth?.totalPriceAll || 0) / dataMonth?.totalCount
  );

  const AverageBill = {
    title: "Average bill",
    value: averageMonth,
    percentage: percentageChange({
      totalDay: averageMonth,
      totalRange: dataPreviousMonth?.totalPriceAll,
      averageDays: dataPreviousMonth?.totalCount,
    }),
    period: "Monthly",
  };

  const dataCancelOrderMonth = await ordersTotalPriceAndCountWithRange({
    dayFrom: startOfMonth,
    dayTo: endOfMonth,
    status: "cancel",
  });
  const dataCancelOrderPreviousMonth = await ordersTotalPriceAndCountWithRange({
    dayFrom: startPreviousOfMonth,
    dayTo: endPreviousOfMonth,
    status: "cancel",
  });

  const failureRateInMonth = percentageCancelAllCount({
    cancelledOrders: dataCancelOrderMonth?.totalCount,
    totalOrders: dataMonth?.totalCount,
  });

  const FailureRate = {
    title: "Failure rate",
    value: failureRateInMonth,
    percentage: compareCancellationPercentage({
      previousMonthCancelled: dataCancelOrderPreviousMonth?.totalCount,
      previousMonthTotal: dataPreviousMonth?.totalCount,
      currentMonthCancelled: dataCancelOrderMonth?.totalCount,
      currentMonthTotal: dataMonth?.totalCount,
    }),
    period: "Monthly",
  };

  return [TotalRevenue, TotalOrders, AverageBill, FailureRate];
};

const generalTotal = async ({ period }) => {
  const {
    startOfMonth,
    endOfMonth,
    startOfQuarterMonth,
    startOfYear,
    endOfYear,
  } = generatedDate();

  if (!period) {
    const allDatesArray = Array.from(
      { length: endOfMonth.diff(startOfMonth, "day") + 1 },
      (_, index) => startOfMonth.add(index, "day").toDate()
    );

    const result = await BillsDAL.findAggregate(
      aggregateRangeDayInMonth({
        dayFrom: startOfMonth.toDate(),
        dayTo: endOfMonth.toDate(),
        status: "closed",
      })
    );
    return {
      labels: allDatesArray.map((date) => Number(dayjs(date).format("DD"))),
      datasets: [
        {
          label: "Total revenue month",
          data: allDatesArray.map((date) => {
            const resultItem = result.find(
              (item) => item._id === dayjs(date).format("YYYY-MM-DD")
            );
            return resultItem ? resultItem.totalPriceAll : 0;
          }),
        },
      ],
    };
  }

  if (period === "quarter") {
    const threeMonthsArray = Array.from({ length: 3 }, (_, index) =>
      endOfMonth.subtract(index, "month")
    );

    const result = await BillsDAL.findAggregate(
      aggregateRangeYearInMonth({
        dayFrom: startOfQuarterMonth.toDate(),
        dayTo: endOfMonth.toDate(),
        status: "closed",
      })
    );
    const monthName = threeMonthsArray.map((date) => date.format("MMMM"));
    return {
      labels: monthName.reverse(),
      datasets: [
        {
          label: "Total revenue quarter",
          data: threeMonthsArray
            .map((date) => {
              const resultItem = result.find(
                (item) => item._id === dayjs(date).format("YYYY-MM")
              );
              return resultItem ? resultItem.totalPriceAll : 0;
            })
            .reverse(),
        },
      ],
    };
  }
  if (period === "year") {
    const monthsArray = Array.from({ length: 12 }, (_, index) =>
      startOfYear.add(index, "month")
    );

    const result = await BillsDAL.findAggregate(
      aggregateRangeYearInMonth({
        dayFrom: startOfYear.toDate(),
        dayTo: endOfYear.toDate(),
        status: "closed",
      })
    );
    const monthNameArr = monthsArray.map((date) => {
      return date.format("MMMM");
    });

    return {
      labels: monthNameArr,
      datasets: [
        {
          label: "Total revenue year",
          data: monthsArray.map((date) => {
            const resultItem = result.find(
              (item) => item._id === dayjs(date).format("YYYY-MM")
            );

            return resultItem ? resultItem.totalPriceAll : 0;
          }),
        },
      ],
    };
  }
  throw createError("Not data found", 404);
};

const orderTypeDataInRange = async ({ dayFrom, dayTo, status }) => {
  const data = {
    labels: ["Dine In", "Take Away", "Delivery"],
    datasets: [
      {
        label: "Total",
        data: [],
      },
    ],
  };

  const orderTypeMap = ["dineIn", "takeAway", "delivery"];

  const dataOrderType = await OrderDAL.findAggregate(
    aggregateRangeOrderType({
      dayFrom,
      dayTo,
      status,
    })
  );

  orderTypeMap.forEach((orderType) => {
    const resultItem = dataOrderType.find((item) => item._id === orderType);
    data.datasets[0].data.push(resultItem ? resultItem.totalPriceAll : 0);
  });

  return data;
};

const orderTypeTotal = async ({ period }) => {
  const {
    startOfMonth,
    endOfMonth,
    startOfQuarterMonth,
    startOfYear,
    endOfYear,
  } = generatedDate();

  if (!period) {
    return orderTypeDataInRange({
      dayFrom: startOfMonth.toDate(),
      dayTo: endOfMonth.toDate(),
      status: "closed",
    });
  }
  if (period === "quarter") {
    return orderTypeDataInRange({
      dayFrom: startOfQuarterMonth.toDate(),
      dayTo: endOfMonth.toDate(),
      status: "closed",
    });
  }
  if (period === "year") {
    return orderTypeDataInRange({
      dayFrom: startOfYear.toDate(),
      dayTo: endOfYear.toDate(),
      status: "closed",
    });
  }
  throw createError("Not data found", 404);
};

export const AnalyticsServices = {
  getTopSalesCategory,
  general,
  generalTotal,
  orderTypeTotal,
};
