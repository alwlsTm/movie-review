import ReviewList from "./ReviewList";
import mockItems from '../mock.json';
import { useEffect, useState } from "react";
import { getReviews } from '../api';

const LIMIT = 6; //고정된 limit 사용

function App() {
  const [order, setOrder] = useState('createdAt'); //아이템 정렬 state
  const [items, setItems] = useState(mockItems);   //아이템 state
  const [offset, setOffset] = useState(0);         //offset(페이지네이션) state
  const [hasNext, setHasNext] = useState(false);   //불러올 데이터 state

  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleBestClick = () => setOrder('rating');       //베스트순

  const handleDelete = (id) => {  //아이템 삭제
    const nextItem = items.filter((item) => item.id !== id);  //아이템의 id를 이용해 필터링
    setItems(nextItem);
  };

  const handleLoad = async (options) => {  //영화 아이템 로드
    const { reviews, paging } = await getReviews(options);

    //offset(오프셋) 페이지네이션
    if (options.offset === 0) { //더보기로 불러온 데이터가 없으면
      setItems(reviews);
    } else {  //offset !== 0
      setItems((prevItems) => [...prevItems, ...reviews]);  //이전 state의 값을 받아서 변경할 state 값을 리턴
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  //더보기(다음 페이지 불러오기)
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT }); //첫 더보기 클릭 시 - order, offset: 6, limit: 6
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);  //order가 바뀌었을 경우 request를 보냄

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>베스트순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {(offset < 43) && <button disabled={!hasNext} onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;