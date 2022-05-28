import './Rating.css';

const RATING = [1, 2, 3, 4, 5]; //별점 배열(1 ~ 5점)

//별 하나를 보여주는 컴포넌트
function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? 'selected' : ''}`;  //selected가 true/false일 때 색을 다르게 적용

  //별 클릭시 실행
  //onSelect prop이 존재할 때만 함수 지정
  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  //별에 마우스를 올렸을 때 실행
  //onHover prop이 존재할 때만 함수 지정
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >*</span>
  );
}

//별 다섯 개를 보여주는 컴포넌트
//onSelect - 별 클릭 시 해당하는 rating 값으로 함수 실행
//onHover - 별에 마우스를 올렸을 때 실행
//onMouseOut - 마우스가 영역을 벗어났을 때 실행
function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATING.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;