import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Text, VStack, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from "@schemas/profile.schema";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from "@components/headers/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Skeleton } from "@components/Skeleton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33;
const MAX_PHOTO_SIZE_IN_MB = 1;

type FormDataProps = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/menezesho.png');

  const toast = useToast();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema) as any,
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

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

  async function handleUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      await api.put('/users', {
        name: data.name,
        old_password: data.currentPassword,
        password: data.newPassword,
      });

      toast.show({
        title: 'Perfil atualizado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro ao atualizar perfil';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        color: 'white',
      });
    } finally {
      setIsUpdating(false);
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

          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                bg='gray.600'
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
                bg='gray.600'
                onChangeText={onChange}
                value={value}
                isDisabled
              />
            )}
          />

          <Heading fontFamily='heading' color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={12}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name='currentPassword'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha atual'
                bg='gray.600'
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name='newPassword'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nova senha'
                bg='gray.600'
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='newPasswordConfirmation'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirmação da nova senha'
                bg='gray.600'
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.newPasswordConfirmation?.message}
              />
            )}
          />

          <Button
            title='Atualizar'
            isLoading={isUpdating}
            onPress={handleSubmit(handleUpdate)}
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}