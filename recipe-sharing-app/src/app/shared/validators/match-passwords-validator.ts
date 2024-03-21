import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  repeatPasswordControlName: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const passwordFormControl = group.get(passwordControlName);
    const repeatPasswordFormControl = group.get(repeatPasswordControlName);

    return passwordFormControl?.value === repeatPasswordFormControl?.value
      ? null
      : { matchPasswordsValidator: true };
  };
}
