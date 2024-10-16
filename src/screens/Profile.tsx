import { Center, Heading, ScrollView, Text, VStack } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { Skeleton } from "@components/Skeleton";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingVertical: 36 }}>
        <Center px={4}>
          {photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
            /> :
            <UserPhoto
              source={{ uri: 'https://github.com/menezesho.png' }}
              alt='Foto de perfil do usuário'
              size={PHOTO_SIZE}
            />
          }

          <TouchableOpacity>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            bg='gray.600'
          />
          <Input
            placeholder='E-mail'
            bg='gray.600'
            isDisabled
          />

          <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={12}>
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder='Senha atual'
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder='Nova senha'
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder='Confirmação da nova senha'
            secureTextEntry
          />

          <Button
            title='Atualizar'
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}