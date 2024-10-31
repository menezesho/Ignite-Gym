import { useCallback, useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { HomeHeader } from "@components/headers/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { LoadingGroupCards } from "@components/loading/LoadingGroupCards";
import { LoadingExerciseCards } from "@components/loading/LoadingExerciseCards";


export function Home() {
  const [isLoadingGroups, setIsLoadingGroups] = useState<boolean>(false);
  const [isLoadingExercises, setIsLoadingExercises] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  async function fetchGroups() {
    try {
      setIsLoadingGroups(true);
      const { data } = await api.get('/groups');
      setGroups(data);
      setSelectedGroup(data[0]);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro ao carregar grupos musculares';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        color: 'white',
      });
    } finally {
      setIsLoadingGroups(false);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoadingExercises(true);
      const { data } = await api.get('/exercises/bygroup/'.concat(selectedGroup));
      setExercises(data as ExerciseDTO[]);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Erro ao carregar grupos musculares';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        color: 'white',
      });
    } finally {
      setIsLoadingExercises(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  }, [selectedGroup]));

  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoadingGroups && (
        <LoadingGroupCards />
      )}

      {!isLoadingGroups && (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{ px: 4 }}
          my={8}
          minH={10}
          maxH={10}
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={selectedGroup.toLocaleUpperCase() === item.toLocaleUpperCase()}
              onPress={() => setSelectedGroup(item)}
            />
          )}
        />
      )}

      <VStack flex={1} px={4}>
        <HStack justifyContent='space-between' mb={4}>
          <Heading fontFamily='heading' color='gray.200' fontSize='md'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        {isLoadingExercises && (
          <LoadingExerciseCards />
        )}

        {!isLoadingExercises && (
          <FlatList
            data={exercises}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <ExerciseCard
                item={item}
                onPress={handleOpenExerciseDetails}
              />
            )}
          />
        )}
      </VStack>
    </VStack>
  );
}