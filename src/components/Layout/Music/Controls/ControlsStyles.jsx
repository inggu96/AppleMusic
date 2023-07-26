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
  box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)
  display: grid;
`;

export const ControlWrap = styled.div``;
export const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleImage = styled.img`
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
  width: 220px;
  text-align: center;
  height: 200px;
`;
export const TitleCaption = styled.p``;
export const TitleChannel = styled.p``;
export const TimeBarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TimeBar = styled.input``;
export const Volume = styled.input``;
export const ControlBar = styled.div``;
export const ControlPrevTime = styled.p``;
export const ControlFullTime = styled.p``;
export const PlayButton = styled.button``;
export const FastButton = styled.button``;
export const RevertButton = styled.button``;
