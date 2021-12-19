import express from "express";
import jwt from "jsonwebtoken";

let router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    //decode it
    let payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!); //if user some how mess the jwt here we get an error
    //so we need to capture that err
    res.send({ currentUser: payload });
  } catch (err) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
