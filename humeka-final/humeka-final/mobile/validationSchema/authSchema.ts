import * as Yup from 'yup';


export const signupSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
  });


export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
})

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('This field is required').min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string().required('This field is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match').required('This field is required'), 
})

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required')
})

export const verifyCodeSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  code: Yup.string().length(6).required('This field is required')
})  

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  newPassword: Yup.string().required('This field is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match').required('This field is required'), 
})

export const editProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  fullName: Yup.string().required('Name is required'),
  profileImg: Yup.string().required('Profile Image is required')
})