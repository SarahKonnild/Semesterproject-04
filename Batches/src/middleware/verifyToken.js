import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
}
