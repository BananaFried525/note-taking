export class ResponseModel {
    constructor(message: String, data: any) {
        this.message = message;
        this.data = data;
    }
    message: String = ""
    data: any = {}

}