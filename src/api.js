//request 함수
//실습 서버에서 정렬한 데이터 받아오기
export async function getReviews({ order = 'createAt', offset = 0, limit = 6 }) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/1999/film-reviews?${query}`
  );
  if (!response.ok) { //에러가 발생할 경우
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}

/*

  ▼paging: {count: 43, hasNext: true}
    ▶count: 43
    ▶hasNext: true
  ▼reviews: [{createdAt: 1625065200000, updatedAt: 1625065200000, id: 38, title: "소리꾼 디오리지널",…},…]
    ▶0:
    ▶1:
    ... 

*/