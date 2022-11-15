import React, { useEffect } from 'react';
import { setModalType } from 'src/state/reduxstate/modals/slice';
import { useAppDispatch } from 'src/state/reduxstate/store';
import styled from 'styled-components';

interface ModalWrapperProps extends Styles {
  children: React.ReactNode;
  isLoader?: boolean;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  isLoader = false,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const onMount = () => {
    const body = document.getElementById('root');
    if (typeof window !== 'undefined') {
      body?.classList.add('disable-scrolling');
    }
    if (body && !isLoader) {
      body.style.position = 'fixed';
    }
    return () => {
      if (body) {
        body.style.position = 'static';
      }
    };
  };

  const closeModal = () => {
    dispatch(setModalType(null));
  };

  useEffect(onMount, []);

  return (
    <>
      <Overlay onClick={() => closeModal()} {...props} />
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
  topPositionOverlay?: string;
}

const Overlay = styled.div<Styles>`
  position: fixed;
  top: ${({ topPositionOverlay }) =>
    topPositionOverlay ? topPositionOverlay : '0'};
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
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1002;
`;
