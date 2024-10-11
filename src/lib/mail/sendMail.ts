import nodemailer from "nodemailer";
import { config } from "../../config";

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  attachments?: { filename: string; path: string }[]
) => {
  try {
    const transporterConfig = {
      host: config.mailHost || "default-host",
      port: Number(config.mailPort) || 587,
      secure: config.isMailPortSecure === "true",
      auth: {
        user: config.mailUser || "default-user",
        pass: config.mailPass || "default-pass",
      },
      // service: "gmail",
      // auth: {
      // 	user: config.email_user,
      // 	pass: config.email_pass,
      // },
    };

    const transporter = nodemailer.createTransport(transporterConfig);
    const info = await transporter.sendMail({
      // from: `${config.mail}`,
      from: `Expert Squad <${config.mailUser}>`,
      to,
      subject,
      html,
      attachments: attachments || [],
    });
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
