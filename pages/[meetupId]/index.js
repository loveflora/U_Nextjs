import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://kshhhh0640:T4d!4BmbmYA!9uj@cluster0.qiacvx0.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: blocking,
    // fallback: true ---> 빈페이지가 즉시 반환, 동적으로 생성된 콘텐츠를 풀다운함. 따라서 페이지에 데이터가 아직 없는 경우를 처리해야 함.
    // fallback: blocking ---> 페이지가 미리 생성될 때까지 사용자는 아무것도 볼 수 없고 완성된 페이지가 제공됨.
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// 모든 meetups 접근
// const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
// find : 모든 meetups에 접근할 수 있게 해줌
// _id: 1은 ID만 포함하고 다른 필드 값은 포함하지 않음.

// getStaticPaths : 동적페이지에서 필요한 함수, 어떤 동적 매개변수 value의 어떤 페이지가 pre생성되어야 하는지 말해줌.

// fallback: false,
// fallback: false ---> path에게 모든 지원되는 meetupId value 포함하라고 하는거임. (즉, 지원되지 않는 값을 입력하면 ! 404 error 발생)
// fallback: true ---> 들어오는 요청에 관해서 서버에서 meetupId로 동적으로 생성
// fallback : 특정 meetupId value 관해서 페이지 중 일부를 pre생성함. (특정 paths를 정의함)
// ex) 주기적으로 방문되는 페이지에서 요청이 들어올 때 잃어버린 부분을 동적으로 pre생성함.

// 모든 동적 세그먼트 value가 있는 객체
// paths: meetups.map((meetup) => ({
//   params: { meetupId: meetup._id.toString() },
// })),

// [
//   // 동적 페이지 버전 당 객체가 하나
//   {
//     params: {
//       // dynamic page segment가 여러 개 있다면, 키가 여러개 있을 것.
//       // 해당 파일에서는 single dynamic segment로 meetupId가 있음.
//       meetupId: "m1",
//     },
//   },
//   {
//     params: {
//       meetupId: "m2",
//     },
//   },
// ],
// };
// }

// NextJS가 동적 페이지의 모든 버전의 Pre생성이 필요하다.
// 동적이기 때문에 어떤 ID value가 Pre생성되는지 알아야 함.

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;
  // ID 객체 --- [meetupID 프로퍼티]
  // build 프로세스 중에 ,,, 모든 url에 pre생성해야 함.

  const client = await MongoClient.connect(
    "mongodb+srv://maximilian:arlAapzPqFyo4xUk@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
