export type TPayloadRegister={
    user_name?:string,
    fullName?:string,
    email?:string,
    password?:string,
    user_email?:string,
    user_password?:string,
    confirmPassword?:string,
    confirmNewPassword?:string
}
export type TPayloadLogin={
    email:string,
    password:string,
}