import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Image, VStack, Text, Center, Heading, View, ScrollView, useToast } from "native-base";

import type { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '@schemas/signIn.schema';

import { useAuth } from '@hooks/useAuth';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from '@utils/AppError';

type FormDataProps = {
  email: string;
  password: string;
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { signIn } = useAuth();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro na autenticação';

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
              Acesse sua conta
            </Heading>

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

            <Button
              title='Acessar'
              isLoading={isLoading}
              onPress={handleSubmit(handleSignIn)}
            />
          </Center>

          <Center mt={16}>
            <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
              Ainda não tem acesso?
            </Text>

            <Button
              title='Criar conta'
              variant='outline'
              onPress={handleNewAccount}
              mb={8}
            />
          </Center>
        </View>
      </VStack>
    </ScrollView>
  );
}