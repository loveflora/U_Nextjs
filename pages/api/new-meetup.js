// POST /api/new-meetup

// API : HTML 코드 return 안함 ---> 대신 http 요청 받음.

// DB에 데이터 저장
// JSON data를 return

// API Router가 API end point를 만들게 함.

// 경로 : pages > api
// 내용 : server side 코드 포함하는 함수를 정의 (인증서 가능) ---> api router는 서버에서만 들어감 ! client (X)
// req <-- 요청 (incoming) : header, 요청 body request
// res --> 응답 (outcoming)

// req.method : 어떤 요청이 보내졌는지 !
// req.method === "POST" --> POST request 에서만 해당 함수코드를 trigger 함.

// req.body 접속해서 데이터 받음 (body 필드는 또다른 built-in body - 요청의 body 데이터 포함)

import { MongoClient } from "mongodb";

async function handler(req, res) {
  //? 1. 요청이 들어오면
  if (req.method === "POST") {
    const data = req.body;

    //? 2. db에 데이터 저장하고
    const client = await MongoClient.connect(
      "mongodb+srv://kshhhh0640:T4d!4BmbmYA!9uj@cluster0.qiacvx0.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups"); // 꼭 meetups 안해도 됨
    // collection : SQL DB에 있는 tables
    // documents : 해당 tables의 항목

    // collection 에 새 문서를 삽입하기 위해 구축된 query 명령 중 하나인 insertOne
    const result = await meetupsCollection.insertOne(data);
    // 요청 body에서 받고 싶은 것을 DB에 저장
    //  const { title, image, address, description } = data;

    // data 객체를 db에 삽입

    client.close();

    //? 3. 다시 응답을 보냄
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
