const forgotPasswordOtpTemplate = (otp : number) => {
  return `
    <!DOCTYPE html>
    <html>
      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 520px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-sizing: border-box;
        ">

          <!-- Brand -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="
              margin: 0;
              font-size: 28px;
              color: #111827;
            ">
              Vower
            </h1>

            <p style="
              margin-top: 6px;
              color: #6b7280;
              font-size: 14px;
            ">
              EV Charging, made simple.
            </p>
          </div>

          <!-- Content -->
          <h2 style="
            color: #111827;
            font-size: 22px;
            margin-bottom: 12px;
          ">
            Reset your password
          </h2>

          <p style="
            color: #4b5563;
            font-size: 15px;
            line-height: 1.6;
          ">
            We received a request to reset the password for your
            Vower account. Use the verification code below to
            continue with resetting your password.
          </p>

          <!-- OTP -->
          <div style="
            text-align: center;
            margin: 32px 0;
          ">
            <div style="
              display: inline-block;
              background-color: #f3f4f6;
              padding: 18px 32px;
              border-radius: 10px;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #111827;
            ">
              ${otp}
            </div>
          </div>

          <p style="
            color: #4b5563;
            font-size: 14px;
            line-height: 1.6;
          ">
            This verification code will expire in
            <strong>5 minutes</strong>.
          </p>

          <p style="
            color: #4b5563;
            font-size: 14px;
            line-height: 1.6;
          ">
            If you requested this password reset, enter the code in
            the TickeBaldi or website to continue.
          </p>

          <p style="
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
          ">
            If you didn't request a password reset, you can safely
            ignore this email. Your account will remain secure and
            no changes will be made.
          </p>

          <!-- Footer -->
          <div style="
            border-top: 1px solid #e5e7eb;
            margin-top: 32px;
            padding-top: 20px;
            text-align: center;
          ">
            <p style="
              color: #9ca3af;
              font-size: 12px;
              margin: 0;
            ">
              © ${new Date().getFullYear()} Vower
            </p>

            <p style="
              color: #9ca3af;
              font-size: 12px;
              margin-top: 6px;
            ">
              Powering the Transfer of Tickets.
            </p>
          </div>

        </div>

      </body>
    </html>
  `;
};

module.exports = forgotPasswordOtpTemplate;