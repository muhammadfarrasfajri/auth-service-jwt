import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { username: user.username, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateToken;
