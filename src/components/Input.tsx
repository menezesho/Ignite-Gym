import { Input as NBInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, ...rest }: Props) {
  const isInvalid = !!errorMessage || rest.isInvalid;

  return (
    <FormControl isInvalid={isInvalid} mb={4}>
      <NBInput
        bg='gray.700'
        color='white'
        placeholderTextColor='gray.300'
        h={14}
        px={4}
        borderWidth={0}
        fontSize='md'
        fontFamily='body'
        isInvalid={isInvalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        _disabled={{
          bg: 'gray.500',
          color: 'gray.500',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}