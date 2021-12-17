import express from "express";

let router = express.Router();

router.get("/api/users/currentuser", (req, res) => {});

export { router as currentUserRouter };
