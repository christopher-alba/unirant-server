import authRouter from "./routes/auth";
import server from "./server";
import "./mongodb";
import bodyParser from "body-parser";
import cors from "cors";

const jsonParser = bodyParser.json();
const urlencondedParser = bodyParser.urlencoded({ extended: false });

server.use(jsonParser);
server.use(urlencondedParser);
server.use(
  cors({
    origin: "*",
  })
);

const port: string | number = process.env.PORT || 5000;

server.use("/api/v1", authRouter);

server.listen(port, function () {
  console.log("Listening on port", port);
});
