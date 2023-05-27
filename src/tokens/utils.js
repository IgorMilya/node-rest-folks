import jwt from "jsonwebtoken";

export const generateTokens = ({ payload, role }) => {
  const accessToken = jwt.sign(
    payload,
    role === "ADMIN"
      ? process.env.JWT_ACCESS_SECRET_ADMIN
      : process.env.JWT_ACCESS_SECRET_USER,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    payload,
    role === "ADMIN"
      ? process.env.JWT_REFRESH_SECRET_ADMIN
      : process.env.JWT_REFRESH_SECRET_USER,
    {
      expiresIn: "30d",
    }
  );
  return {
    accessToken,
    refreshToken,
  };
};
