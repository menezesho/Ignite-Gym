import React from 'react'
import { FlatList } from 'native-base'
import { Skeleton } from '@components/Skeleton'

export function LoadingExerciseCards() {
  return (
    <FlatList
      data={Array.from({ length: 5 })}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <Skeleton
          h={20}
          mb={4}
          rounded='md'
        />
      )}
    />
  )
}