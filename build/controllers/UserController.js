'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const user_1 = __importDefault(require('../models/user'));
const express_validator_1 = require('express-validator');
const newUser = [
  express_validator_1
    .check('password', 'Password must be at least 6 characters')
    .isLength({
      min: 6,
    }),
  express_validator_1
    .check('email', 'Please provide a valid email address')
    .isEmail(),
  express_validator_1
    .check('username', 'Username must be between 4 and 15 characters')
    .trim()
    .isLength({
      min: 4,
      max: 15,
    }),
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const errors = express_validator_1.validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { email, password } = req.body;
        let user = yield user_1.default.findOne({ email: email });
        if (user) {
          return res.status(400).json({ msg: 'Email already in use' });
        }
        user = new user_1.default({ email, password });
        // await user.save();
        return res.json(user);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
      }
    }),
];
exports.default = { newUser };
