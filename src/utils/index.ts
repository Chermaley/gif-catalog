export const validateTagInput = (value: string) => {
    let regex = /[^A-Za-z-,]+$/;
    return value.replace(regex, '');
}