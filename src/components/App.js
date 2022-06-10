import { useCallback, useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from '../api';
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import useAsync from "../hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import './App.css';
import logoImg from '../IMGS/logo.png';
import ticketImg from '../IMGS/ticket.png';
import useTranslate from "../hooks/useTranslate";

const LIMIT = 6; //고정된 limit 사용

function AppSortButton({ selected, children, onClick }) {
  return (
    <button
      disabled={selected}
      className={`AppSortButton ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

//글 불러오기 & 작성 & 수정 & 삭제
function App() {
  const [items, setItems] = useState([]);          //영화 아이템 state
  const [order, setOrder] = useState('createdAt'); //아이템 정렬 state
  const [offset, setOffset] = useState(0);         //offset(페이지네이션) state
  const [hasNext, setHasNext] = useState(false);   //불러올 데이터 state
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  const t = useTranslate(); //다국어 번역 함수 불러오기(커스텀 훅)

  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleBestClick = () => setOrder('rating');       //베스트순

  const handleDelete = async (id) => {  //아이템 삭제
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));  //아이템의 id를 이용해 필터링
  };

  const handleLoad = useCallback(async (options) => {  //영화 아이템 로드
    const result = await getReviewsAsync(options);
    if (!result) return;

    const { reviews, paging } = result;

    //offset(오프셋) 페이지네이션
    if (options.offset === 0) { //더보기로 불러온 데이터가 없으면
      setItems(reviews);
    } else {  //offset !== 0
      setItems((prevItems) => [...prevItems, ...reviews]);  //이전 state의 값을 받아서 변경할 state 값을 리턴
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  }, [getReviewsAsync]); //함수를 고정시켜 재사용

  //더보기(다음 페이지 불러오기)
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT }); //첫 더보기 클릭 시 - order, offset: 6, limit: 6
  };

  //리퀘스트 이후에 비동기로 실행되는 함수
  //새로 만들어진 리뷰를 받아서 items에 바로 적용
  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  }

  //리뷰를 수정 후 리스폰스로 받은 데이터 반영
  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);  //수정할 item index 찾기
      return [
        ...prevItems.splice(0, splitIdx),  //앞 요소
        review, //수정한 리뷰
        ...prevItems.splice(splitIdx + 1), //뒷 요소
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);  //order가 바뀌었을 경우 request를 보냄(handleLoad 고정)

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="MOVIEPEDIA"></img>
          <LocaleSelect />
        </div>
      </nav>
      <div className="App-container">
        <div
          className="App-ReviewForm"
          style={{ backgroundImage: `url("${ticketImg}")` }}
        >
          <ReviewForm onSubmit={createReview} onSubmitSuccess={handleCreateSuccess} />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === 'createdAt'}  //최신순
            onClick={handleNewestClick}
          >
            {t('newest')}
          </AppSortButton>
          <AppSortButton
            selected={order === 'rating'} //별점순
            onClick={handleBestClick}
          >
            {t('best')}
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList
            items={sortedItems}
            onDelete={handleDelete}
            onUpdate={updateReview}
            onUpdateSuccess={handleUpdateSuccess}
          />
          {hasNext ? (
            <button
              className="App-load-more-button"
              disabled={isLoading}
              onClick={handleLoadMore} //더보기
            >
              {t('load more')}
            </button>
          ) : (
            <div className="App-load-more-button"></div>
          )}
          {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">
          {t('term of service')} | {t('privacy policy')}
        </div>
      </footer>
    </div>
  );
}

export default App;