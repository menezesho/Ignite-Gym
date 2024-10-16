import { Skeleton as NBSkeleton, ISkeletonProps } from "native-base";

type Props = ISkeletonProps;

export function Skeleton({ ...rest }: Props) {
  return (
    <NBSkeleton
      {...rest}
      startColor='gray.500'
      endColor='gray.400'
    />
  );
}