import UsersModel from "./UsersModel.js";

const create = async ({ user }) => {
  return new UsersModel(user).save();
};

const findAll = async () => {
  return UsersModel.find();
};

const findByID = async ({ id }) => {
  return UsersModel.findById(id);
};

const findByOne = async ({ findOne }) => {
  return UsersModel.findOne(findOne);
};

const update = async ({ id, updateData }) => {
  return UsersModel.findByIdAndUpdate(id, updateData);
};

const deleteUser = async ({ id }) => {
  return UsersModel.findByIdAndDelete(id);
};

export const UserDAL = {
  create,
  findAll,
  findByID,
  findByOne,
  update,
  deleteUser,
};
