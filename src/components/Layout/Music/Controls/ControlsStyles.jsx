import styled, { keyframes, css } from 'styled-components';

const spinning = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
  }
`;

export const VolumeControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  width: 6rem;

  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
    background: transparent;

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${(props) => (props.volume ? '#D60017' : '#D9D9D9')};
      margin-top: -5px;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.4rem;
      background: ${(props) =>
        props.volume
          ? `linear-gradient(to right,#D60017 ${props.volume}%,  #D9D9D9 ${props.volume}% 100%)`
          : '#E5E7EB'};
      opacity: ${(props) => (props.volume && props.speaker ? '1' : '0.8')};
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }

    .volume-icon {
      opacity: ${(props) => (props.volume && props.speaker ? '1' : '0.8')};
      background: ${(props) => (props.volume ? '#D60017' : '#E5E7EB')};
    }
  }
`;

export const ControlContainer = styled.div`
  height : 100vh;
  box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)
  display: grid;
  position: absolute;
  z-index: 5;
  &.playing-enter {
    opacity: 0;
  }

  &.playing-enter-active {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  &.playing-exit {
    opacity: 1;
  }

  &.playing-exit-active {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 15;
  background-color: #efe3dc;
  opacity: 0.8;
`;
export const ControlWrap = styled.div`
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 55;
`;
export const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 55;
`;
export const TitleImage = styled.img`
  margin-top: 65px;
  height: 15rem;
  width: 15rem;
  border: 0.5rem solid #fff;
  border-radius: 100%;
  overflow: hidden;
  ${({ playing }) =>
    playing &&
    css`
      animation: ${spinning} 7s linear infinite;
    `}
`;
export const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 480px;
  text-align: center;
  height: 200px;
  row-gap: 40px;
`;
export const TitleCaption = styled.p`
  width: 250px;
  height: 50px;
  text-overflow: ellipsis;
  color: #474747;
  line-height: 18px;
`;
export const TitleChannel = styled.p`
  color: #6528f6;
  font-size: 17px;
  font-weight: 500;
`;
export const TimeBarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  column-gap: 10px;
  height: 100px;
`;
export const TimeBar = styled.input`
  width: 300px;
  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
    background: transparent;
    background: #d60017;

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #d60017;
      margin-top: -5px;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.4rem;
      background: #d60017;
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }
  }
`;
export const ControlPrevTime = styled.p`
  font-size: 12px;
  color: #474747;
`;
export const ControlFullTime = styled.p`
  font-size: 12px;
  color: #474747;
`;
export const Volume = styled.input``;
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const PlayWrap = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #6528f6;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PlayButton = styled.button`
  width: 250px;
  color: #fff;
  background-color: #6528f6;
`;
export const FastButton = styled.button``;
export const RevertButton = styled.button``;
