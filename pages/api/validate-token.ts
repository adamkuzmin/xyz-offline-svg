import jwt from "jsonwebtoken";

export default function handler(req: any, res: any) {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("token", token);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify the token with the same secret key used when issuing the token
    jwt.verify(token, "your_secret_key");
    // If verification is successful, send a positive response
    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    // If token verification fails, send an error response
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
