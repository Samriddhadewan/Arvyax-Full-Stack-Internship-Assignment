import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"; 
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default auth;
