import express from "express";

let router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("Hi There!\n");
});

export { router as signoutRouter };
