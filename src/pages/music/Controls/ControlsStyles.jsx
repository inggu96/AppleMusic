import styled from 'styled-components';

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
`;
