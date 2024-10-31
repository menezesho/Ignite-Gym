import { Heading, VStack, HStack, Text, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

export function HomeHeader() {
  const { user } = useAuth();

  return (
    <HStack bg='gray.600' pt={16} pb={5} px={8} alignItems='center'>
      <UserPhoto
        source={user.avatar ? { uri: 'https://github.com/menezesho.png' } : defaultUserPhotoImg}
        alt='Foto de perfil do usuário'
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color='gray.100' fontSize='md'>
          Olá
        </Text>

        <Heading fontFamily='heading' color='gray.100' fontSize='md'>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name='logout'
          color='gray.200'
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  );
}