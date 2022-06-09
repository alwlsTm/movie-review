import { useLocale } from "../contexts/LocaleContext";

const dict = {  //사전으로 사용할 객체
  ko: {
    'confirm button': '확인',
    'cancel button': '취소',
    'edit button': '수정',
    'delete button': '삭제',
    'title placeholder': '제목을 입력해 주세요.',
    'content placeholder': '내용을 입력해 주세요.',
  },
  en: {
    'confirm button': 'OK',
    'cancel button': 'Cancel',
    'edit button': 'Edit',
    'delete button': 'Delete',
    'title placeholder': 'Enter a title',
    'content placeholder': 'Enter the content',
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || ''; //해당 언어에 맞는 값을 리턴

  return translate;
}

export default useTranslate;