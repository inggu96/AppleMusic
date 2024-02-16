import { Box, styled } from '@mui/material';
import { data } from '../Data';
import Item from '../Item';

const List = ({ selectedId }: any) => {
  return (
    <ListContainer className="listWrap">
      <ul className="list">
        {data.map((item) => (
          <Item key={item.id} {...item} isSelected={item.id === selectedId} />
        ))}
      </ul>
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
