import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, VStack, Text, Icon } from "native-base";

import { MaterialIcons } from '@expo/vector-icons';
import type { ExerciseDTO } from "@dtos/ExerciseDTO";

type Props = TouchableOpacityProps & {
  item: ExerciseDTO;
}

export function ExerciseCard({ item, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3}>
        <Image
          source={{ uri: item.thumb }}
          alt='Imagem do exercício'
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode='cover'
        />

        <VStack flex={1}>
          <Heading fontFamily='heading' fontSize='lg' color='white'>
            {item.name}
          </Heading>

          <Text
            fontSize='sm'
            color='gray.200'
            mt={1}
            numberOfLines={2}
          >
            {item.series} séries x {item.repetitions} repetições
          </Text>
        </VStack>

        <Icon
          as={MaterialIcons}
          name='chevron-right'
          color='gray.300'
        />
      </HStack>
    </TouchableOpacity>
  );
}