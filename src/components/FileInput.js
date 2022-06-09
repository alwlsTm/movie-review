import { useEffect, useRef, useState } from "react";
import placeHolderImg from '../IMGS/preview-placeholder.png';
import resetImg from '../IMGS/ic-reset.png';
import './FileInput.css';

function FileInput({ name, value, initialPreview, onChange }) { //file - 비제어 컴포넌트(value prop 사용X)
  const [preview, setPreview] = useState(initialPreview); //이미지 파일 주소 state
  const inputRef = useRef();  //ref 객체(실제 DOM 노드 참조)

  const handleChange = (e) => {
    const nextValue = e.target.files[0];  //file[0] - 선택한 이미지 파일의 객체
    onChange(name, nextValue);  //imgFile:null
  };

  const handleClearClick = () => {  //초기화
    const inputNode = inputRef.current;

    inputNode.value = '';
    onChange(name, null); //imgFile: null
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);  //이미지 파일 오브젝트 url 생성(리턴해 주는 문자열을 해당 파일의 주소처럼 사용 "blob: ~")
    setPreview(nextPreview);

    return () => { //정리
      setPreview(initialPreview); //수정 중에 이미지 파일 보여주기 & 다른 이미지로 변경했다가 지울 경우 다시 원래의 이미지를 보여줌
      URL.revokeObjectURL(nextPreview); //오브젝트 url 해제(메모리 할당 해제)
    }
  }, [value, initialPreview]);  //이미지 파일을 선택할 때마다 미리보기 주소를 바꿈

  return (
    <div className="FileInput">
      <img
        className={`FileInput-preview ${preview ? 'selected' : ''}`}
        src={preview || placeHolderImg}
        alt="이미지 미리보기"
      ></img>
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      ></input>
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} alt="선택해제"></img>
        </button>
      )}
    </div>
  );
}

export default FileInput;

/*

  console.log(e.target.files)
  
  ▼FileList {0: File, length: 1}
    ▶0: File {name: " ", lastModified: 1628133839923, ... }
      lenth: 1


  console.log(inputRef);

  ▼{current: input}
    ▶current: input         => input - file input을 가리킴(실제 DOM 노드를 참조할 수 있음)
    ▶[[Prototype]]: Object

 */