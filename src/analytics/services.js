import { CategoryDAL } from "../categories/CategoriesDAL.js";
import { BillsDAL } from "../bills/BillsDAL.js";
import { _logFunc } from "nodemailer/lib/shared/index.js";
import {
  aggregateDishes,
  filterWithCategory,
  generatedAmountDishes,
  generatedAmountDishesByParentCategory,
} from "./utils.js";

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

const generalAnalytics = async () => {};

export const AnalyticsServices = {
  getTopSalesCategory,
};
