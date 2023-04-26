export class LoginSession {

    lastAccess: string;
    ipAddress: string;
    name: string;
    
    constructor() {
        this.lastAccess = "";
        this.ipAddress = ""
        this.name = ""
    }
}