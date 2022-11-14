import React, { memo, Suspense } from "react";
import styled from "styled-components";

import { Spinner } from "src/Components/elements/Spinner";

const Fallback = () => (
  <LoaderWrapper>
    <Spinner />
  </LoaderWrapper>
);

export const withSuspense = <P,>(LazyComponent: React.ComponentType<P>) => {
  const WrappedWithSuspense = memo((props) => (
    <Suspense fallback={<Fallback />}>
      <LazyComponent {...(props as unknown as any)} />
    </Suspense>
  ));
  WrappedWithSuspense.displayName = "WrappedWithSuspense";
  return WrappedWithSuspense as unknown as React.FC<P>;
};

const LoaderWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  min-height: 100vh;
  background: white;
  position: absolute;
  align-items: center;
  justify-content: center;
`;
