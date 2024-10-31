import React from 'react'
import { ScrollView, VStack, Image, HStack, Box, Text } from 'native-base'
import { Button } from '@components/Button'
import { Skeleton } from '@components/Skeleton'

export function LoadingExercise() {
  return (
    <ScrollView>
      <VStack p={4}>
        <Skeleton
          h={80}
          mb={3}
          rounded='lg'
        />

        <Box bg='gray.600' rounded='md' pb={4} px={4}>
          <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
            <Skeleton w={100} h={6} rounded='sm' />
            <Skeleton w={100} h={6} rounded='sm' />
          </HStack>

          <Skeleton h={14} rounded='sm' />
        </Box>
      </VStack>
    </ScrollView>
  )
}