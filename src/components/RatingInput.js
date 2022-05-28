import { useState } from "react";
import Rating from "./Rating";
import './RatingInput.css';

function RatingInput({ name, value, onChange }) {
  const [rating, setRating] = useState(value); //선택한 별점 보여주기 & 마우스를 올렸을 때 별점 미리보기 state

  const handleSelect = (nextValue) => onChange(name, nextValue);  //ReviewForm 컴포넌트로 값 반영

  const handleMouseOut = () => setRating(value);  //별에 마우스가 벗어났을 때 기존 별점 보여주기

  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handleSelect}     //별점 선택
      onHover={setRating}         //마우스를 올렸을 때 별점 미리보기
      onMouseOut={handleMouseOut} //마우스가 벗어났을 때 기존 별점 보여주기
    />
  );
}

export default RatingInput;