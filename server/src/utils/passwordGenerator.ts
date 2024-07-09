import { createHash } from "crypto";

type PasswordGeneratorProps = {
  fname: string;
  lname: string;
  email: string;
  number: number;
};

export const generateNewPassword = function ({ fname, lname, email, number }: PasswordGeneratorProps) {
  //generate a password using user fields
  const hash = createHash("sha256"); //TODO: salt can also be used here
  hash.update(fname + lname + email + number);
  const password = hash.digest("hex").slice(0, 8);
  return password;
};
