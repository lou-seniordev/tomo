export type FieldValidatorType = (value:string)=> string | undefined;
export const requiredField: FieldValidatorType = (value) =>{
    if(value) return undefined;
    return "Field is required";
}

export const maxLength = (length:number): FieldValidatorType => (value) =>{
    if(value && value.length > length) return `Field must be less than ${length} symbols`;
    return undefined;
}