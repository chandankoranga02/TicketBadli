
const onboardingEmailTemplate = ({
  name,
  email,
  createdAt,
  ipAddress,
}: {
  name: string;
  email: string;
  createdAt: string;
  ipAddress: string;
}) => {
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
              TicketBadli
            </h1>

            <p style="
              margin-top: 6px;
              color: #6b7280;
              font-size: 14px;
            ">
              Tickets made simpler.
            </p>
          </div>

          <!-- Content -->
          <h2 style="
            color: #111827;
            font-size: 22px;
            margin-bottom: 12px;
          ">
            Welcome to TicketBadli 👋
          </h2>

          <p style="
            color: #4b5563;
            font-size: 15px;
            line-height: 1.6;
          ">
            Dear <strong>${name}</strong>,
          </p>

          <p style="
            color: #4b5563;
            font-size: 15px;
            line-height: 1.6;
          ">
            Your TicketBadli account has been successfully created.
            We're glad to have you with us.
          </p>

          <!-- Account Details -->
          <div style="
            margin: 28px 0;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 20px;
          ">

            <p style="
              margin: 0 0 14px 0;
              color: #111827;
              font-size: 15px;
              font-weight: bold;
            ">
              Account Details
            </p>

            <div style="margin-bottom: 10px;">
              <span style="
                color: #6b7280;
                font-size: 13px;
              ">
                Name
              </span>

              <div style="
                color: #111827;
                font-size: 14px;
                margin-top: 3px;
              ">
                ${name}
              </div>
            </div>

            <div style="margin-bottom: 10px;">
              <span style="
                color: #6b7280;
                font-size: 13px;
              ">
                Email
              </span>

              <div style="
                color: #111827;
                font-size: 14px;
                margin-top: 3px;
              ">
                ${email}
              </div>
            </div>

            <div style="margin-bottom: 10px;">
              <span style="
                color: #6b7280;
                font-size: 13px;
              ">
                Account Created
              </span>

              <div style="
                color: #111827;
                font-size: 14px;
                margin-top: 3px;
              ">
                ${createdAt}
              </div>
            </div>

            <div>
              <span style="
                color: #6b7280;
                font-size: 13px;
              ">
                IP Address
              </span>

              <div style="
                color: #111827;
                font-size: 14px;
                margin-top: 3px;
              ">
                ${ipAddress}
              </div>
            </div>

          </div>

          <!-- Security Notice -->
          <div style="
            background-color: #fff7ed;
            border-left: 4px solid #f97316;
            padding: 14px 16px;
            border-radius: 6px;
            margin-bottom: 24px;
          ">

            <p style="
              margin: 0;
              color: #9a3412;
              font-size: 13px;
              line-height: 1.5;
            ">
              <strong>Security notice:</strong>
              If you did not create this account, please contact
              our support team immediately.
            </p>

          </div>

          <p style="
            color: #4b5563;
            font-size: 14px;
            line-height: 1.6;
          ">
            You can now log in to your account and start using
            TicketBadli.
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
              © ${new Date().getFullYear()} TicketBadli
            </p>

            <p style="
              color: #9ca3af;
              font-size: 12px;
              margin-top: 6px;
            ">
              Making ticket exchange simple and secure.
            </p>

          </div>

        </div>

      </body>
    </html>
  `;
};

module.exports = onboardingEmailTemplate;

