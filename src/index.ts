import authRouter from "./routes/auth";
import server from "./server";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./mongodb";
import { User } from "./mongodb/models";
import profileRouter from "./routes/profile";
import { Router } from "express";
import { expressjwt, GetVerificationKey } from "express-jwt";
import JwksRsa from "jwks-rsa";

const jsonParser = bodyParser.json();
const urlencondedParser = bodyParser.urlencoded({ extended: false });
server.use(jsonParser);
server.use(urlencondedParser);
const corsConfig = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://unirant.netlify.app"
      : "http://localhost:3000",
  credentials: true,
};
server.use(cors(corsConfig));
server.options("*", cors(corsConfig));
server.enable("trust proxy");

export const jwtCheck = expressjwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://chris-alba-dev.au.auth0.com/.well-known/jwks.json",
  }) as GetVerificationKey,
  audience: "https://chris-alba-dev.au.auth0.com/api/v2/",
  issuer: "https://chris-alba-dev.au.auth0.com/",
  algorithms: ["RS256"],
});

const port: string | number = process.env.PORT || 5000;

server.use("/api/v1", authRouter);
server.use("/api/v1", profileRouter);

server.listen(port, function () {
  console.log("Listening on port", port);
});
