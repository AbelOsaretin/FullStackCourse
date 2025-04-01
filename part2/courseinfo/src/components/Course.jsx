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

  // return (
  //   <div>
  //     <Header name={course[1].name} />
  //     <Content part={course[1].parts} />
  //     <Total parts={course[1].parts} />
  //   </div>
  // );
};

export default Course;
