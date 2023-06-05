import bcrypt from "bcrypt";
import { generateTokens } from "../tokens/utils.js";
import { UserDAL } from "./usersDAL.js";
import { TokenDAL } from "../tokens/tokenDAL.js";
import { validateRefreshToken } from "../tokens/validateTokens.js";
import UsersModel from "./UsersModel.js";
import { sendEmailRegistration } from "../mail/MailService.js";

const getAll = async (query) => {
  if (query.role) {
    query.role = { $in: query.role?.split(",") };
  }
  if (query.field) {
    const regexp = new RegExp(query.field, "i");
    query.$or = [];
    Object.keys(UsersModel.schema.paths).forEach((path) => {
      if (path !== "_id" && path !== "createdAt" && path !== "updatedAt") {
        const fieldQuery = {};
        fieldQuery[path] = regexp;
        query.$or.push(fieldQuery);
      }
    });
    delete query.field;
  }

  const { page, limit, ...findValue } = query;
  const perPage = limit || 8;
  const skip = ((parseInt(page) || 1) - 1) * perPage;

  return UserDAL.findAll({ skip, perPage, findValue });
};

const getByID = async (id) => {
  return UserDAL.findByID({ id });
};

const getUsersLogin = async () => {
  return UserDAL.getUserLogin();
};

const update = async ({ id, updateData, picture }) => {
  if (updateData?.password) {
    updateData.password = await bcrypt.hash(updateData.password, 3);
  }

  if (picture) {
    updateData.userImage = picture;
  }

  await UserDAL.update({ id, updateData });

  return UserDAL.findByID({ id });
};

const registration = async (user) => {
  try {
    const isHashPassword = JSON.stringify(user.password);

    user.password = await bcrypt.hash(user.password, 3);

    const data = await UserDAL.create({ user });
    const { password, ...userData } = data._doc;
    const tokens = generateTokens({
      payload: userData,
      role: userData.role,
    });

    if (userData.email) {
      const { email, firstName, secondName } = userData;
      await sendEmailRegistration({
        email,
        firstName,
        secondName,
        password: isHashPassword,
      });
    }
    await TokenDAL.create({
      user: data._id,
      refreshToken: tokens.refreshToken,
    });

    return {
      ...tokens,
      data,
    };
  } catch (err) {
    throw new Error("An unknown error occurred");
  }
};

const login = async ({ userId, password }) => {
  const data = await UserDAL.findByID({ id: userId });

  if (data) {
    const isPasswordEqual = await bcrypt.compare(password, data.password);

    if (isPasswordEqual) {
      const { password, ...userData } = data._doc;

      const tokens = generateTokens({ payload: userData, role: userData.role });

      await TokenDAL.create({
        user: data._id,
        refreshToken: tokens.refreshToken,
      });

      return { ...tokens, data };
    } else {
      throw new Error("Incorrect username or password");
    }
  }

  throw new Error("Incorrect username or password");
};

const logout = async ({ refreshToken }) => {
  const deleteTokenData = await TokenDAL.deleteToken({ refreshToken });

  if (deleteTokenData) {
    return { message: "logout successful" };
  }
};

const refresh = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new Error("You are not logged in");
  }
  const userTokenData = validateRefreshToken(refreshToken);
  const tokenFromDB = TokenDAL.getOne({ refreshToken });

  if (!userTokenData || !tokenFromDB) {
    throw new Error("You are not logged in");
  }

  const userData = await UserDAL.findByID({ id: userTokenData._id });
  const { password, ...data } = userData._doc;
  const tokens = generateTokens({ payload: data, role: data.role });

  await TokenDAL.update({
    user: data.id,
    refreshToken: tokens.refreshToken,
  });

  return { ...tokens, data: userData };
};

export const UserService = {
  getAll,
  getByID,
  getUsersLogin,
  update,
  registration,
  login,
  logout,
  refresh,
};
