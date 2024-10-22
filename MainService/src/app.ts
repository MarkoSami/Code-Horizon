import express, { NextFunction, Request, Response } from "express";
import "./config/passport/localStartegyPassport.config";
import "./config/passport/jwtStartegyPassport.config";
import RedisConfig from "./config/redis.config";
import MessageProducer from "./RabbitMQ/MessageProducer";
import { config } from "dotenv";
import passport from "passport";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDoc from "./config/swagger.json";
import mainApiRouter from "./routes/apis.routes";
import queryStringParser from "./middlewares/queryStringParser";
import morgan from "morgan";
import colors from "colors";


async function Main() {

  const app = express();
  config();

  RedisConfig.connect();

  const PORT = process.env.PORT || 3001;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.use(passport.initialize());

  // dev shit
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
  });


  // Routes 
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDoc));


  app.use(queryStringParser);
  // api routes

  app.use("/api", mainApiRouter)


  // Global error handing middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.log(err.message);
    res.status(500).json("Something went wrong");
  });

  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    // Total memory usage in MB
    const totalMemory = (memoryUsage.rss / 1024 / 1024).toFixed(2);

    // Total CPU usage: User + System in milliseconds
    const totalCpu = ((cpuUsage.user + cpuUsage.system) / 1000).toFixed(2);

    // Output memory and CPU usage with color
    console.log("_____________________________________________________\n");
    console.log(colors.blue(`Memory Usage: ${colors.bold(totalMemory)} MB`));
    console.log(colors.green(`CPU Usage: ${colors.bold(totalCpu)} ms`));
    console.log("_____________________________________________________\n");


  }, 10000); // Log every 5 seconds





  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

Main();
