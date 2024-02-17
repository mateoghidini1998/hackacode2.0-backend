const User = require('../models/User.model');
const asyncHandler = require('../middleware/async');

//@route    POST api/auth/register
//@desc     Register a user
//@access   Public

exports.register = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
 
    let user = await User.findOne({ where: { email } });

    if(user){
        return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
    }

    //Create user
    user = await User.create({ email, password });

    //Return jsonwebtoken -> this for users to be logged in right after registration
    /* console.log(user); */
    sendTokenResponse(user, 200, res);
});

//@route    POST api/auth/
//@desc     Login user
//@access   Public

exports.login = async (req, res) => {
    res.json({ msg: 'Login a user' });
};


//Get Token from model, create a cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
   // Create token
    const token = user.getSignedJwtToken();
    /* console.log('Token: ', token);
    console.log('User: ', user);
    console.log('Res: ', res); */
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
};