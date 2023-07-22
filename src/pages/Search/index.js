import React, { useEffect, useState } from 'react';

// Map 객체 생성하고 값 추가하기
const Search = () => {
  const [myMap, setMyMap] = useState(new Map());
  const [currentKey, setCurrentKey] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  // 초기에 Map 객체를 설정
  useEffect(() => {
    const mapData = new Map();
    mapData.set('key1', 'value1');
    mapData.set('key2', 'value2');
    mapData.set('key3', 'value3');
    mapData.set('key4', 'value4');
    setMyMap(mapData);
  }, []);

  // Iterator 생성
  const iterator = myMap.keys();

  // 다음 값을 가져오고 표시하는 함수
  const showNextValue = () => {
    const nextResult = iterator.next();
    if (nextResult.done) {
      // Iterator가 마지막 키에 도달하면 처음 키로 다시 돌아감
      iterator = myMap.keys();
      const firstKey = iterator.next().value;
      const firstValue = myMap.get(firstKey);
      setCurrentKey(firstKey);
      setCurrentValue(`다음 키: ${firstKey}, 다음 값: ${firstValue}`);
    } else {
      const nextKey = nextResult.value;
      const nextValue = myMap.get(nextKey);
      setCurrentKey(nextKey);
      setCurrentValue(`다음 키: ${nextKey}, 다음 값: ${nextValue}`);
    }
  };

  return (
    <div>
      <button id="nextButton" onClick={showNextValue}>
        다음 값 보기
      </button>
      <div id="currentKeyValue">
        {currentValue},{currentKey}
      </div>
    </div>
  );
};

export default Search;
