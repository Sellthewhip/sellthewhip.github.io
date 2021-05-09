const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);
const to = process.env.TO_EMAIL;
const from = process.env.FROM_EMAIL;

// @desc          Email from quote
// @route         POST /api/v1/quote
// @access        Private (cors origin)
exports.quote = async (req, res, _next) => {
  if (!req.body) return res.status(400);

  let {
    subject,
    contactName,
    contactNumber,
    email,
    vehicleModel,
    vehicleReg,
    mileage,
    postalCode,
    comments,
  } = req.body;

  const msg = {
    to,
    from,
    subject: subject,
    text: `
    Contact Name: ${contactName ? contactName : "Not provided"}\n
    Contact Number: ${contactNumber}\n
    Email: ${email}\n
    Vehicle Model: ${vehicleModel ? vehicleModel : "Not provided"}\n
    Vehicle Registration: ${vehicleReg ? vehicleReg : "Not provided"}\n
    Mileage: ${mileage ? mileage : "Not provided"}\n
    Postal Code: ${postalCode ? postalCode : "Not provided"}
    ${comments ? `Comments: ${comments}` : ""}
      `,
  };

  try {
    await sgMail.send(msg);

    res.json({ success: true });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    res.json({ success: false });
  }
};
