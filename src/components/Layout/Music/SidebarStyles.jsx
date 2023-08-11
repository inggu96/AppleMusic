import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const SidebarToggler = styled.button`
  cursor: pointer;
  position: fixed;
  top: 350px;
  height: 60px;
  transition: 350ms ease;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  z-index: 51;
  outline: none;
  right: ${({ displayMusic }) => (displayMusic ? '480px' : '0px')};
  @media (max-width: 468px) {
    display: block;
    right: ${({ displayMusic }) => (displayMusic ? '480px' : '0px')};
    transition: 350ms ease;
  }
  &:hover {
    background-color: #6528f6;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateX(3px);
  }
`;

export const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ displayMusic }) => (displayMusic ? '30rem' : '0rem')};
  height: 100vh;
  transition: width 350ms ease;
  border-right: 1px solid #d4d8dd;
  overflow-x: hidden;
  ${({ displayMusic }) =>
    displayMusic && 'box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)'};
  ::-webkit-scrollbar {
    width: 4px;
    height: 3px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #eaeced;
    &:hover {
      background: #d5e0f3;
    }
  }
  @media (max-width: 468px) {
    width: 5rem;
  }
`;
