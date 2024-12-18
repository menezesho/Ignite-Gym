import { useEffect, useState } from "react";
import { Box, HStack, Image, Text, VStack, ScrollView, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { AppError } from "@utils/AppError";
import { Button } from "@components/Button";
import { ExerciseHeader } from "@components/headers/ExerciseHeader";
import { LoadingExercise } from "@components/loading/LoadingExercise";

import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

type RouteParams = {
  exerciseId: number;
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const thumbUri = exercise ? api.defaults.baseURL?.concat('/exercise/demo/', exercise!.demo) : '';

  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { exerciseId } = route.params as RouteParams;

  async function fetchExercise() {
    try {
      setIsLoading(true);
      const { data } = await api.get('/exercises/'.concat(exerciseId.toString()));
      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro ao carregar exercício';

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

  async function handleExerciseComplete() {
    try {
      setIsCompleting(true);
      await api.post('/history/', { exercise_id: exerciseId });

      toast.show({
        title: 'Exercício marcado como realizado',
        placement: 'top',
        bgColor: 'green.700',
        color: 'white',
      });

      navigation.navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro ao marcar exercício como realizado';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        color: 'white',
      });
    } finally {
      setIsCompleting(false);
    }
  }

  useEffect(() => {
    fetchExercise();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <ExerciseHeader item={exercise} />

      {isLoading && (
        <LoadingExercise />
      )}

      {!isLoading && (
        <ScrollView>
          <VStack p={4}>
            <Box rounded='lg' mb={3} overflow='hidden'>
              <Image
                w='full'
                h={80}
                source={{ uri: thumbUri }}
                alt={exercise.name ?? 'Imagem do exercício'}
                resizeMode='cover'
              />
            </Box>

            <Box bg='gray.600' rounded='md' pb={4} px={4}>
              <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
                <HStack>
                  <SeriesSvg />
                  <Text color='gray.200' ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color='gray.200' ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title='Marcar como realizado'
                isLoading={isCompleting}
                onPress={handleExerciseComplete}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}