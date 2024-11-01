import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";

import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { AppError } from "@utils/AppError";
import { ScreenHeader } from "@components/headers/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { LoadingExercise } from "@components/loading/LoadingExercise";
import type { HistoryGroupDTO } from "@dtos/HistoryGroupDTO";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryGroupDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const { data } = await api.get('/history');
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro ao carregar histórico';

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

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de exercícios' />

      {isLoading && (
        <LoadingExercise />
      )}

      {!isLoading && (
        <SectionList
          px={4}
          sections={exercises}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <HistoryCard item={item} />}
          renderSectionHeader={({ section }) => (
            <Heading fontFamily='heading' color='gray.200' fontSize='md' mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color='gray.100' textAlign='center'>
              Nenhum exercício registrado. {'\n'}
              Vamos fazer um exercício hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  );
}