import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Récupérer le token de l'en-tête Authorization

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier si l'utilisateur est administrateur
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide' });
  }
};
