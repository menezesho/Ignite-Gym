import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HomeHeader } from "@components/headers/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [selectedGroup, setSelectedGroup] = useState('costas');
  const [groups, setGroups] = useState(['costas', 'ombros', 'biceps', 'triceps', 'peito', 'pernas', 'abdomen']);
  const [exercises, setExercises] = useState(['Remada lateral', 'Puxada frontal', 'Remada unilateral']);

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

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
          <Heading color='gray.200' fontSize='md'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              name={item}
              image='https://conteudo.imguol.com.br/c/entretenimento/f9/2019/08/27/remada-na-maquina-1566927337178_v2_1036x685.jpg'
              description='3 séries de 10 repetições'
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}