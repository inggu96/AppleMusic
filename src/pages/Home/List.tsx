import { Box, IconButton, styled } from '@mui/material';
import { data } from './Data';
import ImageItem from './ImageItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const List = ({ selectedId }: any) => {
  const NextArrow = ({ onClick }: any) => (
    <NextArrowStyled onClick={onClick}>
      <ArrowForwardIosIcon />
    </NextArrowStyled>
  );

  // PrevArrow 컴포넌트
  const PrevArrow = ({ onClick }: any) => (
    <PrevArrowStyled onClick={onClick}>
      <ArrowBackIosNewIcon />
    </PrevArrowStyled>
  );

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <ListContainer className="listWrap">
      <Slider {...settings}>
        {data.map((item) => (
          <ImageItem key={item.id} {...item} />
        ))}
      </Slider>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  '.slick-list': {
    marginBottom: '50px',
  },
  '.slick-prev:before, .slick-next:before': {
    color: theme.palette.common.black,
  },
}));

const NextArrowStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '30px',
  bottom: '-40px',
  zIndex: 1,
}));

const PrevArrowStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '80px',
  bottom: '-40px',
  zIndex: 1,
}));
