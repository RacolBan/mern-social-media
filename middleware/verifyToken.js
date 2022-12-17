import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('No credentials or invalid credentials.');
    };
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    };
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    req.user = data;
    next();
  } catch(err){
    res.status(500).json({ error: err.message });
  };
};

export default verifyToken;