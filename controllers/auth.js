import passport from "passport";

export const authWithGoogle = passport.authenticate("google", {
  scope: ["profile"],
});

export const googleAuthCallback = [
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  },
];

export const logoutUser = (req, res) => {
  req.logout();
  res.redirect("/");
};
