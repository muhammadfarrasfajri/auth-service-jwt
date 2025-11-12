export const accessUserOrAdmin = (req, res, next) => {
  const userLogin = req.user.username;
  const { username } = req.params;
  if (username !== userLogin && req.user.role !== "admin") {
    return res.status(403).json({ message: "access denied" });
  }
  next();
};
