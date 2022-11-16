import {ERROR_MESSAGE} from "./constant.js";


export const isNew=(target)=>{
    if(!target){
        throw new Error(ERROR_MESSAGE.NEW);
    }
}

export const isString=(title)=>{
    if(!title instanceof String){
        throw new Error(ERROR_MESSAGE.String);
    }
}

export const isObject=(post)=>{
    if(!post instanceof Object){
        throw new Error(ERROR_MESSAGE.Object);
    }
}
