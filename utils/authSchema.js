import * as yup from "yup";

export const authSchema = yup.object().shape({
  email: yup.string().email().trim().required("Please enter email"),
  password: yup
    .string()
    .trim()
    .required("Please enter password")
    .min(6, "Password must be six charactor"),
});
