import './ReviewList.css';

//createdAt의 날짜 형식
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}`
}


//영화 리스트 아이템
function ReviewListItem({ item }) {
  return (
    <div className='ReviewListItem'>
      <img className='ReviewListItem-img' src={item.imgUrl} alt={item.title}></img>
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
      </div>
    </div>
  );
}

//영화 리스트
function ReviewList({ items }) {
  return (
    <ul className='ReviewList'>
      {items.map((item) => {
        return (
          <li>
            <ReviewListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;