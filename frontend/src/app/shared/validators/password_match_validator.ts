import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string, ComfirmPasswordControlName: string) => {
    const validator = (form: AbstractControl) => {
        const passwordControl = form.get(passwordControlName);
        const ConfirmPasswordControl = form.get(passwordControlName);

        if(!passwordControl || !ConfirmPasswordControl) return;
        if(passwordControl.value !== ConfirmPasswordControl.value){
            ConfirmPasswordControl.setErrors({notMatch: true})
        }else{
            const errors = ConfirmPasswordControl.errors

            if(!errors) return

            delete errors.notMatch;
            ConfirmPasswordControl.setErrors(errors)
        }
    }
    return validator;
}