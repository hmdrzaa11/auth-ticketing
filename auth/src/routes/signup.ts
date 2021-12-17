import express from "express";

let router = express.Router();

router.post("/api/users/signup", (req, res) => {
  res.send("Hi There!\n");
});

export { router as signupRouter };
