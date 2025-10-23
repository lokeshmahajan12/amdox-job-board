import jwt from "jsonwebtoken";

export default function issueAuthCookie(res, payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  return token;
}
