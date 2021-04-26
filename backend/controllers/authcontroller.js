const User = require('../models/authmodel')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const { OAuth2Client } = require('google-auth-library')
const fetch = require('node-fetch')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

//Custom error handler to handle database errors
const { errorHandler } = require('../helpers/dbErrorHandling')

const { result } = require('lodash')

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  const token = jwt.sign(
    {
      name,
      email,
      password
    },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: '15m'
    }
  );
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fyp.typingguru@gmail.com',
      pass: 'thisismyfyp2021'
    }
  });

  const mailOptions = {
    from: 'fyp.typingguru@gmail.com',
    to: email,
    subject: 'Account Activation Link',
    html: `
              <h1>Hello!</h1>
              <h1>Please use the following link to activate your account</h1>
              <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
              <hr />
              <p>Thank you for connecting with us.</p>
              <p>${process.env.CLIENT_URL}</p>
           `
  };


  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          errors: 'Email is taken'
        });
      } else {
        transporter.sendMail(mailOptions)
          .then(sent => {
            return res.json({
              message: `Email has been sent to ${email}`
            });
          })
          .catch(err => {
            return res.status(400).json({
              success: false,
              errors: errorHandler(err)
            });
          });
      }
    });
  }
};

exports.activationController = (req, res) => {
  const { token } = req.body
  if (token) {
    //Verify the token is valid or not or expired
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: 'Expired link. Please signup again'
          })
        } else {
          //valid than save to db and get name email from token
          const { name, email, password } = jwt.decode(token)

          const user = new User({
            name,
            email,
            password
          })
          user.save((err, user) => {
            if (err) {
              return res.status(401).json({
                error: errorHandler(err)
              })
            } else {
              return res.json({
                success: true,
                message: user,
                message: 'Signup success'
              })
            }
          })
        }
      }
    )
  } else {
    return res.json({
      message: 'Error happening please try again'
    });
  }
}

exports.loginController = (req, res) => {
  const { email, password } = req.body
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    //Check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist, Please sign up"
        })
      }
      //Authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: 'Email and password do not match'
        })
      }
      //Generate Token
      const token = jwt.sign({
        _id: user._id
      }, process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      )
      const { _id, name, email } = user
      return res.json({
        token,
        user: {
          _id,
          name,
          email
        }
      })
    })
  }
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user._id
  algorithms: ['HS256']
});

exports.forgetPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0]
    return res.status(422).json({
      error: firstError
    })
  } else {
    //FInd if user exists
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'The email address is not valid'
        })
      }

      //generate token for user with this id for 15 mins
      const token = jwt.sign({
        _id: user._id
      }, process.env.JWT_RESET_PASSWORD, {
        expiresIn: '15m'
      })

      //send email with this token 
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fyp.typingguru@gmail.com',
          pass: 'thisismyfyp2021'
        }
      });

      const mailOptions = {
        from: 'fyp.typingguru@gmail.com',
        to: email,
        subject: 'Password Reset Link',
        html: `
              <h1>Hello!</h1>
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                <hr />
                <p>Thank you for connecting with us.</p>
                <p>${process.env.CLIENT_URL}</p>
             `
      };
      return user.updateOne({
        resetPasswordLink: token
      }, (err, success) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          })
        } else {
          transporter.sendMail(mailOptions)
            .then(sent => {
              return res.json({
                message: `Email has been sent to ${email}`
              });
            })
            .catch(err => {
              return res.status(400).json({
                message: err.message
              });
            });
        }
      })
    })
  }
}

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: 'Expired link. Try again'
          });
        }

        User.findOne(
          {
            resetPasswordLink
          },
          (err, user) => {
            if (err || !user) {
              return res.status(400).json({
                error: 'Something went wrong. Try later'
              });
            }

            const updatedFields = {
              password: newPassword,
              resetPasswordLink: ''
            };

            user = _.extend(user, updatedFields);

            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  error: 'Error resetting user password'
                });
              }
              res.json({
                message: `Great! Now you can login with your new password`
              });
            });
          }
        );
      });
    }
  }
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
exports.googleController = (req, res) => {
  //Get token from request
  const { idToken } = req.body

  //Verify Token
  client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(response => {
      const {
        email_verified, name, email
      } = response.payload
      //Email Verification
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          //Find if the email already exists
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d' //token validation
            })
            const { _id, email, name } = user;
            //send response to frontedn with token and user info
            return res.json({
              token,
              user: { _id, email, name }
            })
          } else {
            //If user does not exists, save in db and generate a password
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password })  //create user object with this email
            user.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err)
                })
              }
              //If no error generate token 
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              )
              const { _id, email, name } = data;
              return res.json({
                token,
                user: { _id, email, name }
              })
            })
          }
        })
      } else {
        return res.status(400).json({
          error: 'Google login failed. Please try again'
        })
      }
    })
}

