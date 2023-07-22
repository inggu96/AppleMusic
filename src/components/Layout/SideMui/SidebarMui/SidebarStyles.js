import styled from 'styled-components';

export const Children = styled.div`
  width: 100%;
  height: 100%;
  margin-left: ${({ displaySidebar }) => (displaySidebar ? '15rem' : '5rem')};
  @media (max-width: 468px) {
    margin-left: 5rem;
  }
`;
export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const SidebarLogoWrapper = styled.div`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: ${({ displaySidebar }) =>
    displaySidebar ? 'space-between' : 'center'};
  align-items: center;
  @media (max-width: 468px) {
    justify-content: center;
  }
`;

export const LogoImage = styled.img`
  ${({ displaySidebar }) => (displaySidebar ? ' width: 100px' : ' width: 70px')}
`;

export const SidebarLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 468px) {
    display: none;
  }
`;

export const SidebarBrand = styled.span`
  display: ${({ displaySidebar }) => (displaySidebar ? 'block' : 'block')};
  font-size: ${({ displaySidebar }) => (displaySidebar ? '35px' : '20px')};
`;

export const SidebarToggler = styled.button`
  cursor: pointer;
  display: ${({ displaySidebar }) => (displaySidebar ? 'block' : 'none')};
  @media (max-width: 468px) {
    display: block;
  }
`;

export const ItemsList = styled.ul`
  list-style: none;
`;

export const Search = styled.div`
  display: ${({ displaySidebar }) => (displaySidebar ? 'block' : 'none')};
  width: 207px;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    left: 10;
    bottom: 0px;
    width: 100%;
    height: 4px;
    background-color: #6528f6;
    scale: 0;
    transform-origin: left;
    transition: scale 250ms;
  }
  :focus-within::before {
    scale: 1;
  }
`;
export const SearchBar = styled.input`
  width: 207px;
  height: 32px;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  padding-left: 30px;
  ::placeholder {
    font-size: 12px;
    font-weight: 200;
  }
`;

export const ItemContainer = styled.li`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.25rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background: #eaeced;
  }
  &.active {
    background-color: #dbe4f3;
    color: #6528f6;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #7c7788;
  &:hover {
    color: #6528f6;
  }
  &.active {
    color: #6528f6;
  }
`;

export const ItemName = styled.span`
  margin-left: ${({ displaySidebar }) => (displaySidebar ? '0.5rem' : '0')};
  display: ${({ displaySidebar }) => (displaySidebar ? 'block' : 'none')};
  text-transform: capitalize;
`;

export const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ displaySidebar }) => (displaySidebar ? '15rem' : '5rem')};
  height: 100vh;
  padding: 0.75rem;
  background: #f3f4f4;
  transition: width 350ms ease;
  border-right: 1px solid #d4d8dd;
  overflow-x: hidden;
  ${({ displaySidebar }) =>
    displaySidebar && 'box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)'};
  ${ItemWrapper} {
    justify-content: ${({ displaySidebar }) => !displaySidebar && 'center'};
  }
  &:hover {
    ${({ displaySidebar }) =>
      !displaySidebar && 'box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)'};
    @media (min-width: 468px) {
      width: ${({ displaySidebar }) => !displaySidebar && '15rem'};
      ${SidebarLogoWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && 'space-between'};
      }
      ${SidebarBrand} {
        display: ${({ displaySidebar }) => !displaySidebar && 'block'};
        font-size: ${({ displaySidebar }) =>
          displaySidebar ? '35px' : '35px'};
      }
      ${SidebarToggler} {
        display: ${({ displaySidebar }) => !displaySidebar && 'block'};
      }
      ${ItemWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && 'flex-start'};
      }
  }
      ${ItemName} {
        display: ${({ displaySidebar }) => !displaySidebar && 'block'};
        margin-left: ${({ displaySidebar }) => !displaySidebar && '0.5rem'};
      }
      ${LogoImage} {
        width: ${({ displaySidebar }) => !displaySidebar && '100px'};
      }
      ${Search} {
        display: ${({ displaySidebar }) =>
          displaySidebar ? 'block' : 'block'};
      }
    }
  }
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
