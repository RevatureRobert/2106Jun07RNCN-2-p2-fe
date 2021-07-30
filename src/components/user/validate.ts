import passwordValidator from 'password-validator';
import React from 'react';

export function validate(
  attempt: string,
  type: 'username' | 'password' | 'email'
): boolean {
  let pass: boolean = false;

  const passwordSchema = new passwordValidator();
  // prettier-ignore
  passwordSchema
    .is().min(8)
    .is().max(30)
    .has().digits()
    .has().lowercase()
    .has().uppercase()
    .has().symbols()
    .has().not().spaces();

  const usernameSchema = new passwordValidator();
  //prettier-ignore
  usernameSchema
    .is().min(3)
    .is().max(30)
    .has().lowercase()
    .has().not().uppercase()
    .has().not().symbols()
    .has().not().spaces();

  const emailRegex = /^\S+@\S+\.\S+$/;

  switch (type) {
    case 'username':
      pass = usernameSchema.validate(attempt) as boolean;
      break;
    case 'password':
      pass = passwordSchema.validate(attempt) as boolean;
      break;
    case 'email':
      pass = emailRegex.test(attempt);
      break;
    default:
      console.error("How'd you get here?");
  }

  return pass;
}
