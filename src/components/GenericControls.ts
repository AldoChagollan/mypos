export interface PatternControl {
  value: RegExp;
  message: string;
}

export interface OptionControl {
  name: string;
  value: string;
}

export interface FormControl {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type:
    | "text"
    | "number"
    | "select"
    | "date"
    | "checkbox"
    | "password"
    | "email";
  value: string | number | boolean;
  required?: boolean;
  message?: string;
  pattern?: PatternControl;
  disabled?: boolean;
  options?: OptionControl[];
  prefix?: string;
}
