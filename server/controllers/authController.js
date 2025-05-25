import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// INSCRIPTION
export const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const newUser = new User({ fullname, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ message: 'Inscription réussie ✅', token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur ❌', error });
  }
};

// CONNEXION
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Identifiants incorrects ❌' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: 'Connexion réussie ✅', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur ❌', error });
  }
};
