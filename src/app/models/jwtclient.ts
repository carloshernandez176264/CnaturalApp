export class JwtClient {
    [x: string]: any;
    constructor(
        public id: number,
        public token: string,
        public role: string // el rol viene como "Optional[ROLE_ADMIN]"
    ){}
}