import jwt from "jsonwebtoken";

export const validateAccessToken = (token) => {
  try {
    let validateToken = null;

    try {
      validateToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET_USER);
    } catch (err) {}

    if (!validateToken) {
      try {
        validateToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET_ADMIN);
      } catch (err) {}
    }

    return validateToken;
  } catch (err) {
    return null;
  }
};

export const validateRefreshToken = (token) => {
  try {
    let validateToken = null;

    try {
      validateToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET_USER);
    } catch (err) {}

    if (!validateToken) {
      try {
        validateToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET_ADMIN);
      } catch (err) {}
    }
    return validateToken;
  } catch (err) {
    return null;
  }
};
