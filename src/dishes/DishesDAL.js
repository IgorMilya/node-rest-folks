import mongoose from "mongoose";
import DishDB from "./DishesModel.js";
import { getDishDATA } from "./utils.js";

const create = async (dish) => {
  return DishDB.create(dish);
};

const findAll = async ({ skip, perPage, findValues }) => {
  const totalCount = await DishDB.countDocuments(findValues);
  const data = await DishDB.find(findValues)
    .select("-createdAt -updatedAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);

  return { totalCount, data };
};

const findByID = async (id) => {
  const objectId = new mongoose.Types.ObjectId(id);

  return DishDB.aggregate([
    {
      $match: { _id: objectId },
    },
    ...getDishDATA,
  ]);
};

const update = async (dish) => {
  return DishDB.findByIdAndUpdate(dish.id, dish, { new: true });
};

const deleteDish = async (id) => {
  return DishDB.findByIdAndDelete(id);
};

export const DishesDAL = {
  create,
  findAll,
  findByID,
  update,
  deleteDish,
};
