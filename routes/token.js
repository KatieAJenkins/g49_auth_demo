const router = require('express').Router();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.get('/', function (req,res,next) {
  res.send("Route File Works");
});

router.post('/', function (req,res,next) {
  let validUser = {
    id: 1,
    name: 'Teddi Maull',
    superPower: 'Cuddling',
    email: 'teddi.maull@galvanize.com',
    hash: '$2a$08$uShlVLTKX1ZeRuK8iPDn8.FRl/SxgW.zEpJgYtkBCxITBYohVqaDm'
  }

  let body = req.body;

  if (!body.email || !body.password) {
    return res.sendStatus(401);
  }

  if (body.email !== validUser.email) {
    return res.sendStatus(401);
  }

  if (!bcrypt.compareSync(body.password, validUser.hash)) {
    return res.sendStatus(401);
  }

  let payload = Object.assign({}, validUser);

  delete payload.hash;

  res.cookie('token',jwt.sign(payload,process.env.JWT_SECRET));

  res.send();

});

module.exports = router;
