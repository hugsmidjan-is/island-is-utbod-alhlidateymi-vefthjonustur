import React from 'react'
import { SkeletonLoader, Table as T } from '@island.is/island-ui/core'

const Skeleton = () => {
  const skeleton = Array(10).fill(
    <>
      <T.Data box={{ textAlign: 'left' }}>
        <SkeletonLoader height={40} width="100%" borderRadius="large" />
      </T.Data>
      <T.Data>
        <SkeletonLoader height={40} width="100%" borderRadius="large" />
      </T.Data>
      <T.Data>
        <SkeletonLoader height={40} width="100%" borderRadius="large" />
      </T.Data>
      <T.Data></T.Data>
    </>,
  )
  return (
    <T.Body>
      {skeleton.map((bone, i) => (
        <T.Row key={i}>{bone}</T.Row>
      ))}
    </T.Body>
  )
}

export default Skeleton
