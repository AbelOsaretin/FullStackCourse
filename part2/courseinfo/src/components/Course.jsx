import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
const Course = ({ course }) => {
  console.log("Courses", course);

  return course.map((courses) => {
    return (
      <div key={courses.id}>
        <Header name={courses.name} />
        <Content part={courses.parts} />
        <Total parts={courses.parts} />
      </div>
    );
  });
};

export default Course;
