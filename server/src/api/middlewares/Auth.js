const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET

function Auth(req, res, next) {
  const token = req.headers.token;
  try{
    const isVerify = jwt.verify(token, jwtsecret)
    let decoded;
    if(isVerify){
        decoded = jwt.decode(token, jwtsecret);
    }
    res.locals.data = decoded.username;
    next();
  }catch(err){
    res.json({msg: err})
  }
}

module.exports = Auth;
