import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import nodemailer from "nodemailer";

export const sendEmail = asyncHandler(async (req, res) => {

  const { from, to, subject, html } = req.body;

  if(!subject || !html || !from || !to) throw new ApiError(400, "Unable to Send Email!...");

  const transporter = nodemailer.createTransport({
    host: process.env.MAILE_HOSTER,
    port: process.env.MAILE_HOSTER_PORT,
    auth: {
      user: process.env.MAILE_HOST_USER,
      pass: process.env.MAILE_HOST_PASS,
    },
  });

  let info = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(info, (err, data) => {
    if (err) {
      console.log(err);
      throw new ApiError(500, "Unable to Send Email!...");
    }
    res
      .status(200)
      .json(new ApiResponse(200, data, `Email was Send Successfuly!...`));
  });
});
