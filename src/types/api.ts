type RegisterErrorResponse = {
    error: string
};

type RegisterExistsResponse = {
    status: string
};

type RegisterSuccessResponse = {
    _id: string;
};

export type RegisterResponse = RegisterSuccessResponse | RegisterExistsResponse | RegisterErrorResponse;

export function isRegisterSuccessResponse(response: RegisterResponse): response is RegisterSuccessResponse {
    return Object.prototype.hasOwnProperty.call(response, '_id');
};

export function isRegisterExistsResponse(response: RegisterResponse): response is RegisterExistsResponse {
    return Object.prototype.hasOwnProperty.call(response, 'status');
};

type UserData = {
    login: string;
    password: string;
};

type LoginErrorResponse = {
    error: string;
};

type LoginSuccessResponse = {
    token: string;
    user: UserData;
};

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export function isLoginSuccessResponse(response: LoginResponse): response is LoginSuccessResponse {
    return !Object.prototype.hasOwnProperty.call(response, 'error');
};

type ChatsErrorResponse = {
    error: string;
};

export type ChatData = {
    _id: string;
    name: string;
};

type ChatsSuccessResponse = ChatData[];

export type ChatsResponse = ChatsSuccessResponse | ChatsErrorResponse;

export function isChatsSuccessResponse(response: ChatsResponse): response is ChatsSuccessResponse {
    return !Object.prototype.hasOwnProperty.call(response, 'error');
};

type NewChatErrorResponse = {
    error: string;
};

type NewChatSuccessResponse = {
    insertedId: string;
};

export type NewChatResponse = NewChatSuccessResponse | NewChatErrorResponse;

export function isNewChatSuccessResponse(response: NewChatResponse): response is NewChatSuccessResponse {
    return Object.prototype.hasOwnProperty.call(response, 'insertedId');
};

export type ChatMessage = {
    type: 'message';
    _id: string;
    message: {
        message: string;
        chat_id: string
    };
}
