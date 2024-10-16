import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Image, VStack, Text, Center, Heading, View } from "native-base";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function SignUp() {
  const { control, handleSubmit } = useForm<FormDataProps>();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
  }

  return (
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
              />
            )}
          />

          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title='Voltar para o login'
          variant='outline' mt={24}
          onPress={handleGoBack}
        />
      </View>
    </VStack>
  );
}