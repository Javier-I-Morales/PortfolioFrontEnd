

export class UsuarioModel{

    constructor
    (
        public id: number,
        public email: string,
        public jwt:string,
        public password: string
    ){}
}