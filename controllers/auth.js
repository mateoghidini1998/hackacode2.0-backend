const User = require('../models/User.model');
const Employee = require('../models/Employee.model');
const asyncHandler = require('../middleware/async');

//@route    POST api/auth/register
//@desc     Register a user
//@access   Public

exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, name, lastname, address, dni, birthdate, country, phone, position, salary } = req.body;
 
  let user = await User.findOne({ where: { email } });

  if(user){
      return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
  }

  // Create user
  user = await User.create({ email, password });

  // Use the id of the newly created user to associate the employee
  const employee = await Employee.create({ user_id: user.id, name, lastname, address, dni, birthdate, country, phone, position, salary });

  return res.status(201).json({ user, employee });
});


//@route   POST api/auth
//@desc    Authenticate user & get token
//@access  public

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate email and password
    if(!email || !password){
        return res.status(400).json({ errors: [{ msg: 'Please provide an email and password'}]});
    }

    //See if user exists
    let user = await User.findOne({ where: { email: email }});
    /* console.log('User: ', user); */
    if(!user){
        return res.status(400).json({ errors: [{ msg:'Invalid credentials' }] });
    }

    //Compare the input password, plane text, to the encrypted password.
    const isMatch = await user.matchPassword(password);
    /* console.log('Is Match: ', isMatch); */
    if(!isMatch){
        return res.status(401).json({ errors: [{ msg:'Invalid credentials' }] });
    }

    //Return jsonwebtoken -> this for users to be logged in right after registration
    sendTokenResponse(user, 200, res);

});

//@desc   Get current logged in user
//@route  GET api/auth/me
//@access Private

exports.getMe = asyncHandler(async (req, res, next) => {   
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
    });
    res.status(200).json({
        success: true,
        data: user
    });
});


//@route   PUT api/auth/update
//@desc    Update user details
//@access  Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if(!user){
      return res.status(400).json({ errors: [{ msg: 'User not found'}]});
  }

  await user.update(req.body);
  return res.status(200).json({user})

});


//Get Token from model, create a cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
   // Create token
    const token = user.getSignedJwtToken();
  
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

//@route PUT /api/v1/auth/softdelete/:id
//@desc   Soft delete a user and employee by id
//@access Private

exports.softDeleteSale = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
      return next(new ErrorResponse(`User not found`, 404));
  }

  await user.update({ is_active: false });
  const employee = await Employee.findOne({ where: { user_id: user.id } });
  await employee.update({ is_active: false });

  res.status(200).json({ success: true, data: {} });
});



// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});


