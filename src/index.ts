import authRouter from "./routes/auth";
import server from "./server";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./mongodb";
import "./config/passport";
import { NewUser } from "./types/user";
import { User } from "./mongodb/models";

const jsonParser = bodyParser.json();
const urlencondedParser = bodyParser.urlencoded({ extended: false });
server.use(jsonParser);
server.use(urlencondedParser);
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.set("trust proxy", 1);
server.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser((user: any, done: any) => {
  console.log("serializing user: " + user);
  return done(null, user._id);
});

passport.deserializeUser((id: string, done: any) => {
  console.log("Testing 1");
  User.findById(id, (err: Error, doc: any) => {
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, doc);
  });
});

const port: string | number = process.env.PORT || 5000;

server.use("/api/v1", authRouter);

server.listen(port, function () {
  console.log("Listening on port", port);
});
