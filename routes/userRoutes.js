const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);


// app.delete("/delete/:_id", async (req, resp) => {
//   console.log(req.params)
//   let data = await Product.deleteOne(req.params);
//   resp.send(data);
// })



router
  .route('/:id')
  .delete(userController.deleteUser);


router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
// .post(userController.createUser);

// router
// .route('/:id')
// .get(userController.getUser)
// .patch(userController.updateUser)
// .delete(userController.deleteUser);

module.exports = router;
