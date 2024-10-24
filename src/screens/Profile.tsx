import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Text, VStack, useToast } from "native-base";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from "@components/headers/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Skeleton } from "@components/Skeleton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;
const MAX_PHOTO_SIZE_IN_MB = 1;

export function Profile() {
  const toast = useToast();

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/menezesho.png');

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit: 1,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (photo.canceled) {
        return;
      }

      const photoUri = photo.assets[0].uri;

      const photoInfo = await FileSystem.getInfoAsync(photoUri);

      if (!photoInfo.exists) {
        throw new Error('Foto não encontrada');
      }

      if (photoInfo.size / 1024 / 1024 > MAX_PHOTO_SIZE_IN_MB) {
        toast.show({
          title: `O tamanho máximo permitido da foto é de ${MAX_PHOTO_SIZE_IN_MB}MB`,
          placement: 'top',
          bgColor: 'red.500',
        });
        return;
      }

      setUserPhoto(photoUri);
    } catch (error) {
      console.error(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt='Foto de perfil do usuário'
              size={PHOTO_SIZE}
            />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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