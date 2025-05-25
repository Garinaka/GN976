import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (destinataire, voiture, dateDebut, dateFin) => {
  const mailOptions = {
    from: `"Gari Naka" <${process.env.EMAIL_USER}>`,
    to: destinataire,
    subject: 'Confirmation de votre réservation - Gari Naka',
    html: `
      <h2>Confirmation de réservation</h2>
      <p>Bonjour,</p>
      <p>Votre réservation a bien été enregistrée.</p>
      <ul>
        <li><strong>Voiture :</strong> ${voiture.marque} ${voiture.modele}</li>
        <li><strong>Localisation :</strong> ${voiture.localisation}</li>
        <li><strong>Du :</strong> ${new Date(dateDebut).toLocaleString()}</li>
        <li><strong>Au :</strong> ${new Date(dateFin).toLocaleString()}</li>
      </ul>
      <p>Merci pour votre confiance !</p>
      <p>L'équipe Gari Naka</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendEmailAuProprietaire = async (proprioEmail, voiture, clientEmail, dateDebut, dateFin) => {
  const mailOptions = {
    from: `"Gari Naka" <${process.env.EMAIL_USER}>`,
    to: proprioEmail,
    subject: 'Nouvelle réservation pour votre véhicule - Gari Naka',
    html: `
      <h2>Nouvelle réservation reçue</h2>
      <p>Bonjour,</p>
      <p>Votre véhicule a été réservé par <strong>${clientEmail}</strong>.</p>
      <ul>
        <li><strong>Voiture :</strong> ${voiture.marque} ${voiture.modele}</li>
        <li><strong>Localisation :</strong> ${voiture.localisation}</li>
        <li><strong>Du :</strong> ${new Date(dateDebut).toLocaleString()}</li>
        <li><strong>Au :</strong> ${new Date(dateFin).toLocaleString()}</li>
      </ul>
      <p>Pensez à vérifier la disponibilité du véhicule.</p>
      <p>Merci de faire confiance à Gari Naka.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
