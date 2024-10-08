
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { Image, VStack, Text, Center, Heading, View } from "native-base";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
  return (
    <VStack flex={1} bg={'gray.700'}>
      <Image
        source={BackgroundImg}
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

          <Input
            placeholder='Nome'
          />

          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
          />

          <Input
            placeholder='Senha'
            secureTextEntry
          />

          <Button title='Criar e acessar' />
        </Center>

        <Button title='Voltar para o login' variant='outline' mt={24} />
      </View>
    </VStack>
  );
}