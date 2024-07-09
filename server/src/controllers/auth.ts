import User from "../model/User";
import asyncWrapper from "../middlewares/async";
import { Request, Response } from "express";
import { NotFoundError, BadRequestError, UnAuthenticatedError } from "../errors/custom-error";
import { generateNewPassword } from "../utils/passwordGenerator";
import { mailSender } from "../utils/mailSender";

////////////////////////////////////////////////////////////////////////////////
//////////////////////////R E G I S T E R///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const register = asyncWrapper(async (req: Request, res: Response) => {
  const { fname, lname, email, number } = await req.body;
  //TODO: zod can be used to improve validation and returning errors
  if (!fname || !lname || !email || !number) throw new BadRequestError("Please provide all fields");
  let user = await User.findOne({ fname });
  if (user) throw new BadRequestError("User already exists");
  const password = generateNewPassword({ fname, lname, email, number });
  await mailSender(
    email,
    "Get Your Password here",
    `Hello ${fname} Your username is ${fname} and your password is ${password}`
  );
  user = new User({ fname, lname, email, number, password });
  await user.save();
  res.status(201).json({ message: "User created successfully" });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////L O G I N/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { fname, password } = await req.body;
  if (!fname || !password) throw new BadRequestError("Please provide all fields");
  const user = await User.findOne({ fname });

  if (!user || !(await user.comparePassword(password)))
    throw new UnAuthenticatedError("Username or Password incorrect");

  const token = await user.createJWT();
  res
    .status(200)
    .cookie("access_token", token, {
      // httpOnly: process.env.NODE_ENV === "production" ? true : false,
      path: "/", //accessible on all routes
      sameSite: "lax", //lax doesn't work for chrome and edge browsers
      secure: true,
      // maxAge: ONE_MONTH
    })
    //TODO: fix token with cookies till then sending token with json cookies not working now
    .json({ message: "success", user: { ...user.toObject(), password: undefined }, token });
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////E D I T////P R O F I L E///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const editUser = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const { bio, dpUrl } = req.body;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError(`User with id ${id} not found`);
  if (bio) user.bio = bio;
  if (dpUrl) user.dpUrl = dpUrl;
  await user.save();

  res.status(200).json({ message: "Details updated successfully" });
});
