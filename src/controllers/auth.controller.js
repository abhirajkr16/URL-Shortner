// import { registerUser } from "../services/auth.service.js";

// export const register = async (req, res) => {
//   try {
//     const user = await registerUser(req.body);

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// after using error.middleware.js

import { registerUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
    //this changes
  } catch (error) {
    next(error);
  }
};