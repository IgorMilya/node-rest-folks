import { UserService } from "./usersService.js";

const getAll = async (req, res) => {
  try {
    const data = await UserService.getAll(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getByID = async (req, res) => {
  try {
    const data = await UserService.getByID(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUsersLogin = async (req, res) => {
  try {
    const data = await UserService.getUsersLogin();

    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const update = async (req, res) => {
  try {
    const data = await UserService.update({
      id: req.params.userId,
      updateData: req.body,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const registration = async (req, res) => {
  try {
    if (req.body.picture) {
      req.body.userImage = req.body.picture;
      delete req.body.picture;
    }
    const data = await UserService.registration(req?.body);

    res.json({ data: "Registration success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    const data = await UserService.login(req.body);

    res.cookie("refreshToken", data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ data: data.data, accessToken: data.accessToken });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const logout = async (req, res) => {
  try {
    const data = await UserService.logout(req.cookies);

    res.clearCookie("refreshToken");

    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const refresh = async (req, res) => {
  try {
    const data = await UserService.refresh(req.cookies);

    res.cookie("refreshToken", data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({ data: data.data, accessToken: data.accessToken });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export const UserController = {
  getAll,
  getByID,
  getUsersLogin,
  update,
  registration,
  login,
  logout,
  refresh,
};
