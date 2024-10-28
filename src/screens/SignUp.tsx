import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Image, VStack, Text, Center, Heading, View, ScrollView } from "native-base";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@utils/schemas/sign-up.schema';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Pessoas treinando'
          resizeMode='cover'
          position='absolute'
        />

        <View px={4}>
          <Center my={24}>
            <LogoSvg />

            <Text color='gray.100' fontSize='sm'>
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center>
            <Heading fontFamily='heading' fontSize='xl' color='gray.100' mb={6}>
              Crie sua conta
            </Heading>

            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Nome'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='E-mail'
                  keyboardType='email-address'
                  onChangeText={onChange}
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Senha'
                  onChangeText={onChange}
                  secureTextEntry
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='passwordConfirmation'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Confirmação da senha'
                  onChangeText={onChange}
                  secureTextEntry
                  value={value}
                  errorMessage={errors.passwordConfirmation?.message}
                />
              )}
            />

            <Button
              title='Criar e acessar'
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <Center mt={16}>
            <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
              Já possui uma conta?
            </Text>

            <Button
              title='Voltar para o login'
              variant='outline'
              onPress={handleGoBack}
              mb={8}
            />
          </Center>


        </View>
      </VStack>
    </ScrollView>
  );
}