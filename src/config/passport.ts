import { NewProfile } from "./../types/profile";
import { Error } from "mongoose";
import passport from "passport";
import pgo20 from "passport-google-oauth20";
import plocal from "passport-local";
import { Profile, User } from "../mongodb/models";
import { NewUser } from "../types/user";
import { verifyPassword } from "../utils/auth";

const GoogleStrategy = pgo20.Strategy;
const LocalStrategy = plocal.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "471484454288-4ge4ee2ebu7h4thf6r1ckbh9eq2av0cf.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/v1/auth/google/callback",
    },
    (_: any, __: any, profile: any, cb: any) => {
      User.findOne(
        { googleId: profile.id },
        async (err: Error, doc: NewUser) => {
          if (err) {
            return cb(err, null);
          }
          console.log(profile);
          if (!doc) {
            const newUser = new User({
              googleId: profile.id,
              username: profile.name.givenName + ":" + profile.id,
            });

            await newUser.save();

            const newProfile: NewProfile = {
              username: profile.name.givenName + ":" + profile.id,
              email: profile.emails[0].value,
              profilePicture: profile.photos[0].value,
              displayName: profile.name.givenName,
            };

            const mongoProfile = new Profile(newProfile);
            await mongoProfile.save();

            cb(null, newUser);
          } else {
            cb(null, doc);
          }
        }
      );
    }
  )
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, async (err: Error, user: NewUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      try {
        if ((await verifyPassword(password, user.password as any)) === false) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    });
  })
);
