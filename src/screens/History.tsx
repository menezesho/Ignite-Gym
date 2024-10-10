import { useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '09/10/2024',
      data: ['Puxada frontal', 'Remada unilateral']
    },
    {
      title: '10/10/2024',
      data: ['Puxada frontal', 'Remada frontal']
    }
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de exercícios' />

      <SectionList
        px={8}
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color='gray.200' fontSize='md' mt={10} mb={3}>
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
    </VStack>
  );
}