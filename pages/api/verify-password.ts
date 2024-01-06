import jwt from "jsonwebtoken";

export default function handler(req: any, res: any) {
  const { password } = req.body;
  if (password === "DasdKkdklaLD") {
    // Replace with your actual password check logic
    // Create a token
    const token = jwt.sign(
      { user: "username" }, // Replace with user information or claims
      "your_secret_key", // Secret key for signing the token
      { expiresIn: "7d" } // Token expires in 7 days
    );
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Incorrect password" });
  }
}
