const User = require("../models/user");
const generateToken = require("../utils/generateToken");
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    // ✅ ADD THESE:
    console.log("✅ User created:", user);
    console.log("🔐 JWT_SECRET from env:", process.env.JWT_SECRET);
    console.log("⚙️ Calling generateToken with:", user._id);
    console.log("🧠 typeof generateToken:", typeof generateToken);

    const token = generateToken(user._id);
    console.log("🎫 Generated Token:", token);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};
