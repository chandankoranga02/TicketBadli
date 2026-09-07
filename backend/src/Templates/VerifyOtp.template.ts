const emailOtpTemplate = (otp : number) => {

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
            Verify your email
          </h2>

          <p style="
            color: #4b5563;
            font-size: 15px;
            line-height: 1.6;
          ">
            Thanks for signing up for Vower. Use the verification
            code below to complete your registration.
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
            <strong>10 minutes</strong>.
          </p>

          <p style="
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
          ">
            If you didn't request this code, you can safely ignore
            this email.
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
              © ${new Date().getFullYear()} Appnests
            </p>

            <p style="
              color: #9ca3af;
              font-size: 12px;
              margin-top: 6px;
            ">
              Powering the future of EV charging.
            </p>
          </div>

        </div>

      </body>
    </html>
  `
}

module.exports = emailOtpTemplate;