import { DishesDAL } from "./DishesDAL.js";

import { CategoryDAL } from "../categories/CategoriesDAL.js";

const create = async (dish) => {
  const createdDish = await DishesDAL.create(dish);
  return createdDish;
};

const getAll = async (query) => {
  const { page, limit, status, ...findValues } = query;
  const perPage = limit || 8;
  const skip = ((parseInt(page) || 1) - 1) * perPage;

  const findCategory = await CategoryDAL.find({
    title: { $in: findValues.category?.split(",") },
  });

  if (findValues.search) {
    const regexp = new RegExp(findValues.search, "i");
    findValues.$or = ["title", "description"].map((item) => ({
      [item]: regexp,
    }));
  }

  if (!status) {
    findValues.status = "active";
  } else if (status === "inactive") {
    findValues.status = "inactive";
  } else if (status === "active") {
    findValues.status = "active";
  }

  if (!!findCategory?.length) {
    const arrayIDCategories = {
      $in: findCategory.map((item) => item._id),
    };

    const categoryParent = await CategoryDAL.find({
      parent: arrayIDCategories,
    });

    if (!!categoryParent?.length) {
      findValues.category = {
        $in: categoryParent.map((item) => item._id),
      };

      return DishesDAL.findAll({ skip, perPage, findValues });
    } else {
      findValues.category = arrayIDCategories;
      return DishesDAL.findAll({ skip, perPage, findValues });
    }
  } else {
    return DishesDAL.findAll({ skip, perPage });
  }
};

const getOne = async (id) => {
  if (!id) {
    throw new Error("ID was not set");
  }
  const dish = await DishesDAL.findByID(id);
  return dish;
};

const update = async (dish) => {
  if (!dish.id) {
    throw new Error("ID was not set");
  }
  const updatedDish = await DishesDAL.update(dish);
  return updatedDish;
};

const deleteDish = async (id) => {
  if (!id) {
    throw new Error("ID was not set");
  }
  const dish = await DishesDAL.deleteDish(id);
  return dish;
};

export const DishesService = {
  create,
  getAll,
  getOne,
  update,
  deleteDish,
};
