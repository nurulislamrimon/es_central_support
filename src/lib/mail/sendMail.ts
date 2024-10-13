import nodemailer from "nodemailer";
import { config } from "../../config";

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  attachments?: { filename: string; path: string }[]
) => {
  try {
    if (!config.mailHost || !config.mailUser || !config.mailPass) {
      throw new Error("Mail configuration is missing");
    }
    const transporterConfig = {
      host: config.mailHost,
      port: Number(config.mailPort) || 465,
      secure: config.isMailPortSecure !== "false",
      auth: {
        user: config.mailUser,
        pass: config.mailPass,
      },
      // service: "gmail",
      // auth: {
      //   user: config.emailUser,
      //   pass: config.emailPass,
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
