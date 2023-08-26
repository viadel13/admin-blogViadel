const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

const contact = async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;
    console.log(email);
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        // Paramètres du produit (facultatif)
        name: `Delvia`,
        link: `#`,
        // logo: 'https://example.com/logo.png'
      },
      footer: {
        text: "Copyright 2023 All rights reserved",
      },
    });

    const mail = {
      body: {
        name: "Delvia",
        intro: `Message de ${email}`,
        outro: `${message}`,
      },
    };

    // Générer le HTML de l'e-mail
    const emailBody = mailGenerator.generate(mail);
    let config = {
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);
    let msg = {

      to: process.env.SEND_TO, // list of receivers
      replyTo: email,
      subject: `Nouveau message de ${email}: ${sujet}`, // Subject line
      text: `Nom: ${nom}\nE-mail: ${email}\nMessage: ${message}`, // plain text body
      html: emailBody, // html body

    };
    const response = await transporter.sendMail(msg);
    res.status(200).json({ message: "E-mail envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de l'envoi de l'e-mail",
    });
  }
};

module.exports = {
  contact,
};
