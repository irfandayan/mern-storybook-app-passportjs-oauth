import Story from "../models/Story.js";

export const userLogin = (req, res) => {
  res.render(`login`, {
    layout: "login",
  });
};

export const userDashboard = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render(`dashboard`, {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
};
