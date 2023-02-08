import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { engine } from "express-handlebars";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import passportConfig from "./config/passport.js";
import routes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import storiesRoute from "./routes/stories.js";
import methodOverride from "method-override";
import {
  formatDate,
  truncate,
  stripTags,
  editIcon,
  select,
} from "./helpers/hbs.js";

// Load config
dotenv.config({ path: `./config/config.env` });

// Passport config
passportConfig(passport);

// Connect to DB
connectDB();

const app = express();
// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
// HTML only supports GET & POST --> https://stackoverflow.com/questions/5162960/should-put-and-delete-be-used-in-forms
// Make use of PUT & DELETE methods by getting the hidden input field _method from client side
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlerbars Helpers
// format Date
// Handlerbars
app.engine(
  ".hbs",
  engine({
    helpers: {
      formatDate,
      truncate,
      stripTags,
      editIcon,
      select,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

// Sessions
// express-session --> https://www.youtube.com/watch?v=hKYjSgyCd60&t=194s
// connect-mongo --> https://meghagarwal.medium.com/storing-sessions-with-connect-mongo-in-mongodb-64d74e3bbd9c
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // create session store inside mongodb database
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  // console.log("🚀 ~ file: app.js:97 ~  res.locals.user", res.locals.user);
  next();
});

// Static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);
app.use("/auth", authRoutes);
app.use("/stories", storiesRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
