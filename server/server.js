const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./database/connectMongoDB");
const route = require("./routes");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("./database/userModel");
const generateStrongPassword = require("./libs/passwordGenerate");
const { v4: uuidv4 } = require("uuid"); 

const app = express();
const port = process.env.PORT || 8000;

app.use(
  session({
    secret: process.env.GOOGLE_OAUTH_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const middleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.WEB_CLIENT_URL_DEV
        : process.env.WEB_CLIENT_URL_PRO,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  }),
];
app.use(middleware);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      const email = req.user.emails ? req.user.emails[0].value : null;
      const existingUser = await User.findOne({
        providerEmail: email,
        provider: "google",
      })
        .select("-password")
        .lean();
      let newUser;
      if (!existingUser) {
        const password = generateStrongPassword();
        newUser = new User({
          name: req.user.displayName,
          password,
          email: uuidv4,
          provider: "google",
          providerEmail: email,
        });

        await newUser.save();
      }

      const token = jwt.sign(
        {
          id: existingUser ? existingUser.id : newUser.id,
          email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      console.log(token);

      res.cookie("user_2225", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.redirect(
        process.env.NODE_ENV === "development"
          ? process.env.WEB_CLIENT_URL_DEV
          : process.env.WEB_CLIENT_URL_PRO
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

app.use(route);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(port, async () => {
  await connectMongoDB();
  console.log(`Server is running on http://localhost:` + port);
});
