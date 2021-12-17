import express from "express";

let router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Hi There!\n");
});

export { router as currentUserRouter };