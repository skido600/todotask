import joi from "joi";

const SignupVal = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
const LoginVal = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export { SignupVal, LoginVal };
