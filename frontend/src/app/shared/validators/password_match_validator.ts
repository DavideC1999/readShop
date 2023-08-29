import { AbstractControl } from "@angular/forms"
// definizione di regole personalizzate per i dati immessi nel form di registrazione
// in particolare fa riferimento al match tra password e confirmPassword
export const PasswordsMatchValidator = (passwordControlName: string, ComfirmPasswordControlName: string) => {
    // validator personalizzato
    const validator = (form: AbstractControl) => {
        // prende i dati dal form
        const passwordControl = form.get(passwordControlName);
        const ConfirmPasswordControl = form.get(ComfirmPasswordControlName);

        // Verifica se i parametri esistono, se no, esci dalla funzione
        if(!passwordControl || !ConfirmPasswordControl) return;

        // Confronta i valori dei due campi di input (password e conferma della password)
        if(passwordControl.value !== ConfirmPasswordControl.value){
            // errore personalizzato se i controlli non corrispondono
            ConfirmPasswordControl.setErrors({notMatch: true})
        }else{
            // Se i valori corrispondono, rimuovi eventuali errori personalizzati precedentemente impostati
            const errors = ConfirmPasswordControl.errors

            if(!errors) return

            delete errors.notMatch; // Rimuovi l'errore "notMatch" se presente tra gli errori
            ConfirmPasswordControl.setErrors(errors) // Imposta nuovamente gli errori (senza "notMatch")
        }
    }

    // Restituisci la funzione validator creata sopra
    return validator;
}