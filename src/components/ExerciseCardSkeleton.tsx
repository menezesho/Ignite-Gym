import { HStack, Icon, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "@components/Skeleton";

export function ExerciseCardSkeleton() {
  return (

    <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3}>
      <Skeleton
        w={20}
        h={16}
        rounded='md'
        mr={4}
      />

      <VStack flex={1}>
        <Skeleton h={4} />

        <Skeleton
          w={200}
          h={4}
          mt={1}
        />
      </VStack>

      <Icon
        as={MaterialIcons}
        name='chevron-right'
        color='gray.300'
      />
    </HStack>
  );
}