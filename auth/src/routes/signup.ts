import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";

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
  async (req: Request, res: Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    let { email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    let user = User.build({ email, password });
    await user.save();
    //generate token
    let userJwt = jwt.sign({ id: user.id, email: user.email }, "asdf");
    //store in on session
    req.session = { jwt: userJwt }; //do it in this fashion and do not use 'req.session.jwt'
    res.status(201).send(user);
  }
);

export { router as signupRouter };
