import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

let router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must between 4 and 20"),
  ],
  (req: Request, res: Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      //errors
      return res.status(400).send(errors.array());
    }
    let { email, password } = req.body;
    console.log("creating user ");
    res.send({});
  }
);

export { router as signupRouter };
