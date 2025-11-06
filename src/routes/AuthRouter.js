import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/AuthController.js";
import { router } from "../lib/router.js";
import { authenticateToken } from "../middleware/AuthenticateToken.js";

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", authenticateToken, logout);

export default router;
