import { FlatList, Heading, HStack, Text, VStack } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [selectedGroup, setSelectedGroup] = useState('costas');
  const [groups, setGroups] = useState(['costas', 'ombros', 'biceps', 'triceps', 'peito', 'pernas', 'abdomen']);
  const [exercises, setExercises] = useState(['Remada lateral', 'Puxada frontal', 'Remada unilateral']);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
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
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}