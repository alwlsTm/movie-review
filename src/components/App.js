import ReviewList from "./ReviewList";
import items from '../mock.json';
import { useState } from "react";

function App() {
  const [order, setOrder] = useState('createdAt'); //아이템 정렬 state
  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleBestClick = () => setOrder('rating');  //베스트순

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>베스트순</button>
      <ReviewList items={sortedItems} />
    </div>
  );
}

export default App;
