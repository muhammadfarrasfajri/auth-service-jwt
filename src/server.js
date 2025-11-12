import { app } from "./application/web.js";
import { logger } from "./application/logging.js";

app.listen(3000, () => {
  logger.info("App start");
});
