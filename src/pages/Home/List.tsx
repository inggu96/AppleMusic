import { Box, styled } from '@mui/material';
import { data } from './Data';
import Item from './Item';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const List = ({ selectedId }: any) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
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
          <Item key={item.id} {...item} />
        ))}
      </Slider>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled(Box)(({ theme }) => ({
  '.listWrap': {
    display: 'flex',
    justifyContents: 'center',
    alignItem: 'center',
    width: '100%',
  },
  '.list ': {
    display: 'flex',
    justifyContents: 'center',
    alignItem: 'center',
    flexDirection: 'row',
  },
}));
