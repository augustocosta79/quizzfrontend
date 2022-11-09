import { Validatable } from "../models/validate.js"


export function validate(obj: Validatable) {
    let isValid = true;
  
    if (obj.required) {
      isValid = isValid && obj.value.trim().length > 0;
    }
  
    if (obj.minLength != null) {
      isValid = isValid && obj.value.length >= obj.minLength;
    }
  
    if (obj.maxLength != null) {
      //checar com null é importante pq evita problemas com valor zero
      isValid = isValid && obj.value.length <= obj.maxLength;
    }
  
    if (obj.min != null) {
      isValid = isValid && +obj.value >= 1;
    }
  
    if (obj.max != null) {
      isValid = isValid && +obj.value <= 5;
    }
  
    return isValid;
  }
  