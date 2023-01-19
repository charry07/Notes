import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { FieldHookConfig, useField } from 'formik';
import { useEffect, useRef } from 'react';

export const AppTextField = (props: TextFieldProps & FieldHookConfig<string> & any) => {
  const [field, meta] = useField(props);
  const { variant = 'standard' } = props;
  const errorText = meta.error && meta.touched ? meta.error : '';

  const inputRef = useRef() as any;

  useEffect(() => {
    if (props.autoFocus) {
      const timeout = setTimeout(() => {
        inputRef.current.focus();
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <TextField
      inputRef={inputRef}
      {...props}
      {...field}
      //   variant={variant}
      helperText={errorText}
      error={!!errorText}
      inputProps={{ readOnly: props.readOnly != undefined ? props.readOnly : false }}
    />
  );
};
