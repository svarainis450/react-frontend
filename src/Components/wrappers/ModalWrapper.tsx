import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ModalWrapperProps extends Styles {
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  ...props
}) => {
  const onMount = () => {
    const body = document.getElementById('body');
    if (typeof window !== 'undefined') {
      body?.classList.add('disable-scrolling');
    }
    if (body) {
      body.style.position = 'fixed';
    }
    return () => {
      if (body) {
        body.style.position = 'static';
      }
    };
  };
  useEffect(onMount, []);

  return (
    <>
      <Overlay />
      <ModalView id="modal" {...props}>
        {children}
      </ModalView>
    </>
  );
};

interface Styles {
  maxWidth?: string;
  maxHeight?: string;
  borderRadius?: string;
  padding?: string;
  overlayBackground?: string;
  overlayOpacity?: string;
  fullScreen?: boolean;
}

const Overlay = styled.div<Styles>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ overlayBackground }) =>
    overlayBackground || 'rgba(0, 0, 0, 0.64)'};
  opacity: ${({ overlayOpacity }) => overlayOpacity || 1};
  z-index: 999;
  cursor: pointer;
`;

const ModalView = styled.div<Styles>`
  position: fixed;
  top: 3rem;
  right: 0;
  left: 0;
  max-width: ${({ maxWidth }) => maxWidth || '480px'};
  margin: auto;
  z-index: 101;
`;
