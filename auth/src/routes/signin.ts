import express from "express";

let router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.send("Hi There!\n");
});

export { router as signinRouter };
