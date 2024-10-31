import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Image, VStack, Text, Center, Heading, View, ScrollView, useToast } from "native-base";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@schemas/signUp.schema';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { api } from '@services/api';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const toast = useToast();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);

      await api.post('/users', { name, email, password });
      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro na criação de conta';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        color: 'white',
      });
    } finally {
      setIsLoading(false);
    }
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
              isLoading={isLoading}
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