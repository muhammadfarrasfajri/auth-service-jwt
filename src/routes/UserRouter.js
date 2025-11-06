import { router } from "../lib/router.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UsersController.js";
import { authenticateToken } from "../middleware/AuthenticateToken.js";

router.get("/", authenticateToken, getUsers);
router.get("/:uuid", getUserById);
router.post("/", createUser);
router.put("/:uuid", updateUser);
router.delete("/:uuid", deleteUser);

export default router;
