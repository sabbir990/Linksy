import transporter from "../src/Utils/nodemailerTransporter.utils";

interface otpEmailProps {
  email: string;
  otp: number;
}

export const sendRegisterOTP = async ({
  email,
  otp,
}: otpEmailProps) => {
  try {
    const sendOTPEmail = await transporter.sendMail({
      from: `"Linksy" <${process.env.NODEMAILER_ADMIN_EMAIL}>`,
      to: email,
      subject: "Your Linksy Registration Verification Code",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Linksy OTP Verification</title>
          </head>

          <body style="
            margin: 0;
            padding: 0;
            background-color: #f4f6fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #1e293b;
          ">
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="background-color: #f4f6fb; padding: 40px 15px;"
            >
              <tr>
                <td align="center">

                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      max-width: 520px;
                      background-color: #ffffff;
                      border-radius: 16px;
                      overflow: hidden;
                      border: 1px solid #e5e7eb;
                    "
                  >

                    <!-- Header -->
                    <tr>
                      <td style="
                        background-color: #1e3a8a;
                        padding: 30px 25px;
                        text-align: center;
                      ">
                        <h1 style="
                          margin: 0;
                          color: #ffffff;
                          font-size: 30px;
                          font-weight: 700;
                          letter-spacing: -1px;
                        ">
                          Linksy<span style="color: #60a5fa;">.</span>
                        </h1>

                        <p style="
                          margin: 8px 0 0;
                          color: #dbeafe;
                          font-size: 13px;
                          letter-spacing: 1px;
                        ">
                          CONNECT. CHAT. STAY CLOSE.
                        </p>
                      </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                      <td style="padding: 35px 30px 20px;">

                        <h2 style="
                          margin: 0 0 15px;
                          color: #111827;
                          font-size: 23px;
                          text-align: center;
                        ">
                          Verify your email address
                        </h2>

                        <p style="
                          margin: 0;
                          color: #64748b;
                          font-size: 15px;
                          line-height: 1.7;
                          text-align: center;
                        ">
                          Welcome to Linksy! We're excited to have you here.
                          To complete your registration, please use the
                          verification code below.
                        </p>

                        <!-- OTP box -->
                        <div style="
                          margin: 30px 0;
                          padding: 22px 15px;
                          background-color: #eff6ff;
                          border: 1px dashed #3b82f6;
                          border-radius: 12px;
                          text-align: center;
                        ">
                          <p style="
                            margin: 0 0 12px;
                            color: #475569;
                            font-size: 12px;
                            font-weight: 600;
                            letter-spacing: 2px;
                            text-transform: uppercase;
                          ">
                            Your verification code
                          </p>

                          <h1 style="
                            margin: 0;
                            color: #1d4ed8;
                            font-size: 36px;
                            font-weight: 700;
                            letter-spacing: 10px;
                          ">
                            ${otp}
                          </h1>
                        </div>

                        <p style="
                          margin: 0;
                          color: #64748b;
                          font-size: 14px;
                          line-height: 1.7;
                          text-align: center;
                        ">
                          This verification code is valid for
                          <strong style="color: #1e293b;">5 minutes</strong>.
                          Please do not share it with anyone.
                        </p>

                        <div style="
                          height: 1px;
                          background-color: #e5e7eb;
                          margin: 30px 0 20px;
                        "></div>

                        <p style="
                          margin: 0;
                          color: #94a3b8;
                          font-size: 13px;
                          line-height: 1.6;
                          text-align: center;
                        ">
                          If you didn't request this verification code,
                          you can safely ignore this email.
                        </p>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="
                        padding: 20px 25px;
                        background-color: #f8fafc;
                        text-align: center;
                      ">
                        <p style="
                          margin: 0;
                          color: #64748b;
                          font-size: 12px;
                        ">
                          © ${new Date().getFullYear()} Linksy. All rights reserved.
                        </p>

                        <p style="
                          margin: 8px 0 0;
                          color: #94a3b8;
                          font-size: 11px;
                        ">
                          This is an automated email. Please do not reply.
                        </p>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return {
      success: true,
      messageId: sendOTPEmail.messageId,
    };

  } catch (err) {
    console.error("Registration OTP email error:", err);

    return {
      success: false,
      message: "Failed to send registration OTP email.",
    };
  }
};