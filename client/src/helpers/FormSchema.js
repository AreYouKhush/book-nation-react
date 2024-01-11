import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

export const RegisterSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5).matches(passwordRules, {message: "Please create a stronger password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password must match")
})

export const LoginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5).matches(passwordRules, {message: "Please create a stronger password"}).required("Required"),
})