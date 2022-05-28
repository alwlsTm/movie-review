import { useState } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import './ReviewForm.css';

function ReviewForm() {
  const [values, setValues] = useState({  //하나의 state로 관리
    //각 input의 필드 값
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,  //name으로 프로퍼티 명을 지정, value로 해당하는 값을 지정
    }));

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => { //onSubmit
    e.preventDefault(); //HTML 폼의 기본 동작을 막음
    console.log(values);
  }

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
      <input name="title" value={values.title} onChange={handleInputChange}></input>
      <RatingInput name="rating" value={values.rating} onChange={handleChange} />
      <textarea name="content" value={values.content} onChange={handleInputChange}></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;