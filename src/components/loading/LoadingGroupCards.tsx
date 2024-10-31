import React from 'react'
import { FlatList } from 'native-base'
import { Skeleton } from '@components/Skeleton'

export function LoadingGroupCards() {
  return (
    <FlatList
      data={Array.from({ length: 5 })}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      my={8}
      pl={4}
      minH={10}
      maxH={10}
      renderItem={() => (
        <Skeleton
          w={24}
          h={10}
          mr={2}
          rounded='md'
        />
      )}
    />
  )
}