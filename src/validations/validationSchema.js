import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string("email should be a string *")
    .email("please provide a valid email address *")
    .required("email address is required *"),
  password: yup
    .string("password should be a string *")
    .min(5, "password should have a minimum length of 5 *")
    .max(12, "password should have a maximum length of 12 *")
    .required("password is required *"),
  // confirmpassword: yup
  //   .string("password should be a string")
  //   .oneOf([yup.ref("password")])
  //   .min(5, "password should have a minimum length of 5 *")
  //   .max(12, "password should have a maximum length of 12 *")
  //   .required("confirm password is required"),
});

// export const registerSchema = yup.object().shape({
//   email: yup
//     .string("email should be a string *")
//     .email("please provide a valid email address *")
//     .required("email address is required *"),
//   password: yup
//     .string("password should be a string *")
//     .min(5, "password should have a minimum length of 5 *")
//     .max(12, "password should have a maximum length of 12 *")
//     .required("password is required *"),
//   confirmpassword: yup
//     .string("password should be a string")
//     .oneOf([yup.ref("password")])
//     .min(5, "password should have a minimum length of 5 *")
//     .max(12, "password should have a maximum length of 12 *")
//     .required("confirm password is required"),
//   firstname: yup
//     .string("first name is should be string *")
//     .required("first name is required *"),
//   lastname: yup
//     .string("last name is should be string *")
//     .required("last name is required *"),
//   mobilenumber: yup
//     .string()
//     .required("ERROR: The number is required!")
//     .test(
//       "Is positive?",
//       "ERROR: The number must be greater than 0!",
//       (value) => value > 0
//     )
//     .max(10, "number should have a maximum length of 10 *"),
//   // country:yup
//   // .string("country should be a string *")
//   // .required("country name is required *")
// });

export const registerSchema = yup.object().shape({
  fieldone: yup
    .string("email should be a string *")
    .required("fieldone is required *"),
  fieldtwo: yup
    .string("fieldtwo should be a string *")

    .required("fieldtwo is required *"),
  fieldthree: yup
    .string("fieldthree should be a string")
    .required("fieldthree required"),
  fieldfour: yup
    .string("fieldfour is should be string *")
    .required("fieldfour is required *"),
  fieldfive: yup
    .string("fieldfive is should be string *")
    .required("fieldfive is required *"),
  fieldsix: yup
    .string("fieldsix is should be string *")
    .required("fieldsix is required!"),
});
