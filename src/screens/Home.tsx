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
import { Skeleton } from "@components/Skeleton";


export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
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

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 4 }}
        my={8}
        minH={10}
        maxH={10}
      />

      <VStack flex={1} px={4}>
        <HStack justifyContent='space-between' mb={4}>
          <Heading fontFamily='heading' color='gray.200' fontSize='md'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        {isLoading ? (
          <FlatList
            data={Array.from({ length: 5 })}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={() => (
              <Skeleton
                width='100%'
                height={90}
                borderRadius={8}
                mb={4}
              />
            )}
          />
        ) : (
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