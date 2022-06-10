import { useLocale } from "../contexts/LocaleContext";

const dict = {  //사전으로 사용할 객체
  ko: {
    'confirm button': '확인',
    'cancel button': '취소',
    'edit button': '수정',
    'delete button': '삭제',
    'newest': '최신순',
    'best': '베스트순',
    'title placeholder': '제목을 입력해 주세요.',
    'content placeholder': '내용을 입력해 주세요.',
    'term of service': '서비스 이용약관',
    'privacy policy': '개인정보 처리방침',
    'load more': '더보기',
  },
  en: {
    'confirm button': 'OK',
    'cancel button': 'Cancel',
    'edit button': 'Edit',
    'delete button': 'Delete',
    'newest': 'Newest',
    'best': 'Best',
    'title placeholder': 'Enter a title',
    'content placeholder': 'Enter the content',
    'term of service': 'Term of Service',
    'privacy policy': 'Privacy Policy',
    'load more': 'Load More',
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || ''; //해당 언어에 맞는 값을 리턴

  return translate;
}

export default useTranslate;