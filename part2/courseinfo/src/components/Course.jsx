import Header from "./Header";
import Content from "./Content";
const Course = ({ course }) => {
  console.log("Course Structure ", course);
  return (
    <div>
      <Header name={course.name} />
      <Content part={course.parts} />
    </div>
  );
};

export default Course;
