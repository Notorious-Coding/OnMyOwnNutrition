import { TextField } from "@mui/material";
import { FormData } from "../../hooks/useForm.hook";

export interface FormTextFieldProps<T> {
  data: FormData<T>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  error?: string;
  type: React.HTMLInputTypeAttribute | undefined;
  defaultValue?: T;
}
export default function FormTextField<T>({ defaultValue, type, data, onChange, label, error }: FormTextFieldProps<T>) {
  return (
    <TextField
      type={type}
      sx={{ maxWidth: 200, mb: 4 }}
      label={label}
      value={data.value}
      error={error != undefined && data.touched}
      helperText={data.touched ? error : ""}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
}
