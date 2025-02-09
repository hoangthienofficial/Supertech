export type TpayloadCheckEmail={
    email:string
}
export type TpayloadCheckCode={
    code:number | string
}
export type TpayloadPassword={

    password: string,
    confirmNewPassword: string,
    newPassword:string,
    
    
}
export type TpayloadUser = {
    user_id?: number;
    user_name?: string;
    user_email?: string;
    user_address?: string | null;
    user_phone?: string | null;
    user_image?: string | null;
    user_role: number;
    level: string | null;
    user_gender: string | null;
    user_birth: string | null;
    user_time: string | null;
    is_verified: boolean;
    user_status: string | null;
};
