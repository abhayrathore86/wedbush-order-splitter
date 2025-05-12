import express from "express";
import orderRoutes from "./routes/orderRoutes";
import { logResponseTime } from "./middleware/logger";

const app = express();
const PORT = 3000;

app.use(express.json());

//Log every request's response time.
app.use(logResponseTime);

app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
