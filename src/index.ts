import authRouter from "./routes/auth";
import server from "./server";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./mongodb";
import "./config/passport";
import { User } from "./mongodb/models";
import profileRouter from "./routes/profile";

const jsonParser = bodyParser.json();
const urlencondedParser = bodyParser.urlencoded({ extended: false });
server.use(jsonParser);
server.use(urlencondedParser);
const allowedDomains = ["http://localhost:3000", "https://unirant.netlify.app"];
server.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
server.set("trust proxy", 1);
server.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
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
server.use("/api/v1", profileRouter);

server.listen(port, function () {
  console.log("Listening on port", port);
});
