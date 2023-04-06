import classes from "./MeetupDetail.module.css";
// nextJS 에서 css 정의하는 방법
// 값들은 고유하게 정해짐 -> 여러 컴포넌트에서 같은 CSS 클래스 이름을 스타일 충돌 없이 사용가능

function MeetupDetails(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title} </h1>
      <address>{props.address} </address>
      <p>{props.description} </p>
    </section>
  );
}

export default MeetupDetails;
