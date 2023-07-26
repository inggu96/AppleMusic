import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMatch, useNavigate } from 'react-router-dom';
import { makeImagePath } from './utils';
import MovieFile from './MovieFile';
import { useDispatch, useSelector } from 'react-redux';
import { searchList } from '../../state/VideoActions';
import { Thumbnails } from '../../components/Common';

const Wrapper = styled.div`
  position: relative;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled(motion.div)`
  position: absolute;
  width: 80%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  height: 200px;
  &:hover {
    bacground-color: rgba(0, 0, 0, 0.5);
    transition: 2s;
  }
`;
const Button = styled.div`
  position: absolute;
  height: 400px;
  width: 50px;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));
  color: white;
  z-index: 1;
`;
const Box = styled(motion.div)`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 25px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const rowVariants = {
  hidden: (direction) => ({
    x: direction > 0 ? window.outerWidth + 10 : -window.outerWidth - 10,
  }), //initial
  visible: {
    x: 0,
  }, //animate
  exit: (direction) => ({
    x: direction > 0 ? -window.outerWidth - 10 : window.outerWidth + 10,
  }), //exit
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 22,
    transition: {
      duration: 0.2,
    },
  },
};

const offset = 4;

const MovieHome = (id, thumbnails, title, channelTitle) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movieMatch = useMatch('/movies/:movieId');
  const { data: movieData, isLoading: movieLoading } = useQuery([
    'movie',
    'nowPlaying',
  ]);

  const [[index, direction], setIndex] = useState([0, 0]);
  const [leaving, setLeaving] = useState(false);
  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const error = useSelector((state) => state.videos.error);

  const maxIndex = Math.floor((movieData?.results.length || 0) / offset) - 1;
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onClick = (newDirection) => {
    if (!leaving) {
      setIndex([index + newDirection, newDirection]);
      toggleLeaving();
    }
  };

  const onBoxClicked = (MovieId) => {
    navigate(`/movies/${MovieId}`);
  };

  return (
    <>
      <Wrapper>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={direction}
        >
          <div>
            <a>인기플레이리스트</a>
          </div>
          <Row
            key={index}
            custom={direction}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: 'tween',
              duration: 0.4,
            }}
          >
            {movieData?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  key={movie.id}
                  layoutId={movie.id + ''}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: 'tween' }}
                  bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                  onClick={() => onBoxClicked(movie.id)}
                ></Box>
              ))}
          </Row>
        </AnimatePresence>
        {index === 0 ? null : (
          <Button
            onClick={() => onClick(-1)}
            style={{
              left: 0,
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.1))',
            }}
          >
            뒤로
          </Button>
        )}
        {index === maxIndex ? null : (
          <Button onClick={() => onClick(1)} style={{ right: 0 }}>
            앞으로
          </Button>
        )}
      </Wrapper>
      {movieMatch ? (
        <MovieFile movieId={movieMatch.params.movieId || ''} />
      ) : null}
    </>
  );
};

export default MovieHome;
