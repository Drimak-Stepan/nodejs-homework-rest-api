const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../middlewars/handleMongooseError");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false }
);

userSchema.post("saveUser", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).max(30).trim().required().messages({
    "any.required": `missing required password field`,
  }),
  email: Joi.string().min(3).max(30).trim().email().required().messages({
    "any.required": `missing required email field`,
  }),
  subscription: Joi.string().min(3).max(30).trim(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(30).trim().required().messages({
    "any.required": `missing required password field`,
  }),
  email: Joi.string().min(3).max(30).trim().email().required().messages({
    "any.required": `missing required email field`,
  }),
});

const arr = ["starter", "pro", "business"];
const updateSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...arr)
    .messages({
      "any.valid": `subscription must be one of ["starter", "pro", "business"]`,
    }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
