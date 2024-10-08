import { Image, VStack, Text } from "native-base";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

export function SignIn() {
  return (
    <VStack
      flex={1}
      bg={'gray.700'}
    >
      <Image
        source={BackgroundImg}
        alt='Pessoas treinando'
        resizeMode='contain'
        position='absolute'
      />

      <LogoSvg />

      <Text>
        Treine sua mente e o seu corpo
      </Text>
    </VStack>
  );
}