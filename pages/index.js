import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is a second meetup!",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
  // 1) 1번 렌더링 : 처음 렌더링될 때는 loadedMeetups 빈 배열(초기상태)임.
  // 2) 이후 useEffect 실행 (state 업데이트)
  // 3) 2번 렌더링 (그제서야 Server에서 받아온 데이터가 보임) : state가 변경되었으므로 컴포넌트 함수가 다시 실행됨 - loadedMeetups에 state 실제 데이터 다시 렌더링함.
  //? NextJS 에서는 사전 렌더링한 HTML 코드를 반환 --> 1번째 렌더링 사이클 결과만 보임 (빈 페이지)
  // 가져올 데이터를 기다리지 않고 완전히 사전 렌더링된 페이지를 반환
}

export async function getStaticProps() {
  // fetch data from API
  return {
    props: {
      // ---> getStaticProps에서 props로 설정한 객체
      meetups: DUMMY_MEETUPS,
    },
    // 점진적 정적 생성 기능 사용가능
    revalidate: 10, // 요청이 들어올 때, 이 페이지를 다시 생성할 때까지 NextJS가 대기하는 시간을 초단위로 표시한 것
    // revalidate에 숫자가 설정되어 있으면, 페이지는 빌드 프로세스 중에 '바로'는 생성되지 않음.
    // 서버에서 몇 초 간격으로 생성됨.
    // revalidate가 10이라면, 이 페이지에 요청이 들어오면 적어도 10초마다 서버에서 페이지를 다시 생성
    // 다시 만들어진 페이지들은 사전에 생성했던 오래된 페이지를 대체함.
    // 이렇게 하면 데이터가 10초보다 오래 되지는 않음.
    // 따라서 숫자는 데이터 업데이트 빈도에 따라 결정하면 됨.
    // 데이터가 1시간마다 변하면, 3600
    // 항상 변하면 1
    // 배포 후 서버에서 때때로 다시 사전 생성할거임.
    // 그러니 일부 데이터가 변경되었다고 해서, 매번 다시 빌드하고 배포할 필요없음 !
  };
}

export default HomePage;

// 데이터에 최신 정보는 없을 수 있음.
// 빌드 프로세스에서 생성됨 -> 이후 배포
// 추후 데이터 추가해도, pre-rendering 페이지에서는 모름.
// client side에서 data fetching 안한다면, outdated data만 볼 수 있을거임.

// 데이터가 변할 때마다 사이트를 다시 빌드해서 다시 배포할 수도 있음.
// 데이터가 자주 변한다면, revalidate 프로퍼티 추가
