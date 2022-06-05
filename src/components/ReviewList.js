import { useContext, useState } from 'react';
import LocaleContext from '../contexts/LocaleContext';
import Rating from './Rating';
import ReviewForm from './ReviewForm';
import './ReviewList.css';

//createdAt의 날짜 형식
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}`
}


//영화 리스트 아이템
function ReviewListItem({ item, onDelete, onEdit }) {
  const locale = useContext(LocaleContext); //context 값 가져오기

  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => onEdit(item.id);

  return (
    <div className='ReviewListItem'>
      <img className='ReviewListItem-img' src={item.imgUrl} alt={item.title}></img>
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <p>현재 언어: {locale}</p>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
}

//영화 리스트
function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null); //수정 중인 글의 id state

  const handleCancel = () => setEditingId(null);  //글 수정 취소

  return (
    <ul className='ReviewList'>
      {items.map((item) => {
        if (item.id === editingId) {  //item.id 가 editingId일 경우 ReviewForm을 렌더링
          const { id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };

          const handleSubmit = (formData) => onUpdate(id, formData);  //글 수정 

          const handleSubmitSuccess = (review) => { //글 수정 완료
            onUpdateSuccess(review);
            setEditingId(null); //입력폼 닫기
          };

          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues} //수정중인 글의 기본값
                initialPreview={imgUrl} //수정중인 글의 이미지 미리보기
                onCancel={handleCancel} //글 수정 취소
                onSubmit={handleSubmit} //글 수정
                onSubmitSuccess={handleSubmitSuccess} //글 수정 완료
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;