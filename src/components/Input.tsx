import { Input as NBInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NBInput
      bg='gray.700'
      color='white'
      placeholderTextColor='gray.300'
      h={14}
      px={4}
      mb={4}
      borderWidth={0}
      fontSize='md'
      fontFamily='body'
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'gray.500',
      }}
      _disabled={{
        bg: 'gray.500',
        color: 'gray.500',
      }}

      {...rest}
    />
  );
}