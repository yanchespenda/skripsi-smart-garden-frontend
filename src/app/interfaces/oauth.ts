export interface SigninResponse {
    username: string;
    accessToken: string;
}

export interface SigninBody {
    username: string;
    password: string;
}

export interface SignupResponse {
    statusCode: number;
    message: string;
}

export interface SignupBody {
    username: string;
    password: string;
    token: string;
}

export interface OauthStatus {
    message: string;
}

export interface OauthUser {
    username: string;
    accessToken: string;
}

export interface OauthMcuToken {
    token: string;
}

export interface OauthChangePassword {
    password: string;
    passwordNew: string;
    passwordConfirm: string;
}
