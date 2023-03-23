const express = require("express");
const jwt  = require('jsonwebtoken');
const jwt_secret = 'noaccess';
const bcrypt = require("bcryptjs");
const db = require("../dataBAse");
const HttpError = require("../http-error");




const Registration = db.registration;




const users = (req, res, next) => {
  console.log("request recieved on server");
  res.status(200).json({ DUMMYUSER });
};





const loginViaEmail = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await Registration.findOne({ where: { email: email } });
  } catch (err) {
    const error = new HttpError(
      "something bad happend while finding the user",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("user does not exist", 500);
    return next(error);
  }

  let unhashedPassword;

  try {
    unhashedPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "something bad happend while decrypting phase ",
      500
    );
    return next(error);
  }

  if (!unhashedPassword) {
    const error = new HttpError("wrong credentials", 500);
    return next(error);
  } else {
    
    let data = {
      email : existingUser.email,
      password : existingUser.password,
      id : existingUser.id
    };

    const authToken = jwt.sign(data,jwt_secret);
    res.json({authToken});
  }

};




const loginViaContact = async (req, res, next) => {
  const { password, contact } = req.body;

  let unhashedPassword = false;

  let existingUser;
  try {
    existingUser = await Registration.findOne({ where: { contact: contact } });

    if (!existingUser) {
      res.status(500).json({ message: "user does not exist " });
    }
    unhashedPassword = await bcrypt.compare(password, existingUser.password);
    if (!unhashedPassword) {
      res.status(500).json({ message: "wrong credentials" });
    } else {
      res.status(200).json({ message: "loged in" });
    }
  } catch (err) {
    const error = new HttpError("something bad happend", 500);
  }
};




const signUp = async (req, res, next) => {
  const { firstname, lastname, password, email, contact } = req.body;

  let existingUser;
  try {
    existingUser = await Registration.findOne({ where: { email: email } });

    if (existingUser) {
      res
        .status(401)
        .json({ message: "user alreay exist , you need to login" });
    } else {
      try {
        let hashedPassword;
        hashedPassword = await bcrypt.hash(password, 12);

        let createdUser = {
          firstname,
          lastname,
          password: hashedPassword,
          email,
          contact,
        };

        console.log(createdUser)
        let data = await Registration.create(createdUser);
        res.status(200).json({ message: "user successfully registered" });
        console.log(data);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "nterinal system error" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "nterinal system error" });
  }
};



const resetPassword = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;

  let updateInfo;
  let hashedPassword;

  hashedPassword = await bcrypt.hash(newPassword, 12);

  try {
    updateInfo = await Registration.update(
      { password: hashedPassword },
      {
        where: {
          email: email,
        },
      }
    );
    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal system error" });
  }
};

exports.users = users;
exports.loginViaEmail = loginViaEmail;
exports.loginViaContact = loginViaContact;
exports.signUp = signUp;
exports.resetPassword = resetPassword;
