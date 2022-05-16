import ReviewList from "./ReviewList";
import mockItems from '../mock.json';
import { useState } from "react";

function App() {
  const [order, setOrder] = useState('createdAt'); //아이템 정렬 state
  const [items, setItems] = useState(mockItems);   //아이템 state
  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleBestClick = () => setOrder('rating');  //베스트순

  const handleDelete = (id) => {  //아이템 삭제
    const nextItem = items.filter((item) => item.id !== id);  //아이템의 id를 이용해 필터링
    setItems(nextItem);
  };

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>베스트순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
