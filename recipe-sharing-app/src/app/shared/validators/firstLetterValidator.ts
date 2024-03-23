import { AbstractControl, ValidatorFn } from '@angular/forms';

export function firstLetterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string | null = control.value as string;
    if (!value || value.length === 0 || /^[a-zA-Z]/.test(value.charAt(0))) {
      return null; 
    } else {
      return { firstLetter: true }; 
    }
  };
}
