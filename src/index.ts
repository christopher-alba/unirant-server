import authRouter from "./routes/auth";
import server from "./server";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./mongodb";
import "./config/passport";

server.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

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
