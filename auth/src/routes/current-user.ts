import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requiredAuth } from "../middlewares/require-auth";

let router = express.Router();

router.get("/api/users/currentuser", currentUser, requiredAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
