

export const requiredField = value =>{
    if(value) return undefined;
    return "Field is required";
}

export const maxLength = (length) => (value) =>{
    if(value && value.length > length) return `Field must be less than ${length} symbols`;
    return undefined;
}