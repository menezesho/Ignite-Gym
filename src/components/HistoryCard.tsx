import { Heading, HStack, VStack, Text } from "native-base";
import { HistoryDTO } from "@dtos/HistoryDTO";

type HistoryCardProps = {
  item: HistoryDTO;
}

export function HistoryCard({ item }: HistoryCardProps) {
  return (
    <HStack w='full' px={5} py={4} mb={3} bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between'>
      <VStack mr={5} flex={1}>
        <Heading fontFamily='heading' color='white' fontSize='md' textTransform='capitalize'>
          {item.group}
        </Heading>

        <Text color='gray.100' fontSize='lg' numberOfLines={1}>
          {item.name}
        </Text>
      </VStack>

      <Text color='gray.300' fontSize='md'>
        {item.hour}
      </Text>
    </HStack>
  );
}