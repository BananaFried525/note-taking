export class Validator {
    constructor() { }
    validateField = (object: any, validateList: String[]): String => {
        let invalidStr = '';
        validateList.forEach((v: any) => {
            if (this.isEmpty(object[v])) { 
                invalidStr += `${v} `; 
            }
        });
        return invalidStr.trim().split(' ').join(',')
    }

    isEmpty = (val: any, option?: { ignore: "undefined" | "null" | "string" | "object" | "array" }): boolean => {
        // case undefined  
        if (val === undefined && option?.ignore != "undefined") return true;
        // case null 
        if (val === null && option?.ignore != "null") return true;
        // case string 
        if ((val === '') || (typeof val === 'string' && val.length === 0) && option?.ignore != "string") return true;
        // case object
        if ((typeof val == "object" && Object.keys(val).length == 0) && option?.ignore != "object") return true;
        // case array
        if (val.length <= 0 && option?.ignore != "array") return true;
        return false
    }
}