import { ExerciseHeader } from "@components/headers/ExerciseHeader";
import { Box, HStack, Image, Text, VStack, ScrollView } from "native-base";

import { Button } from "@components/Button";

import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';

export function Exercise() {
  return (
    <VStack flex={1}>
      <ExerciseHeader />

      <ScrollView>
        <VStack p={4}>
          <Image
            w='full'
            h={80}
            source={{ uri: 'https://conteudo.imguol.com.br/c/entretenimento/f9/2019/08/27/remada-na-maquina-1566927337178_v2_1036x685.jpg' }}
            alt='Nome do exercício'
            mb={3}
            resizeMode='cover'
            rounded='lg'
          />

          <Box bg='gray.600' rounded='md' pb={4} px={4}>
            <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color='gray.200' ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color='gray.200' ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title='Marcar como realizado' />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}