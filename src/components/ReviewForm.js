import { useState } from "react";
import './ReviewForm.css';

function ReviewForm() {
  const [values, setValues] = useState({  //하나의 state로 관리
    //각 input의 필드 값
    title: '',
    rating: 0,
    content: '',
  });

  const handleChange = (e) => { //onChange
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => { //onSubmit
    e.preventDefault(); //HTML 폼의 기본 동작을 막음
    console.log(values);
  }

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange}></input>
      <input type="number" name="rating" value={values.rating} onChange={handleChange}></input>
      <textarea name="content" value={values.content} onChange={handleChange}></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;