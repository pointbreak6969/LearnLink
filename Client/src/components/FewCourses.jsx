import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const FewCourses=() =>{
  const courses = [
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming with this comprehensive course.",
      image: "https://img.freepik.com/free-vector/flat-design-online-courses-illustration_23-2148528493.jpg?t=st=1729503847~exp=1729507447~hmac=d9e867749e32b0f3d63260d06ff8e0883fbc0a802b59817afb8e137e1d2c3fdd&w=740",
      author: "John Doe"
    },
    {
      title: "Web Development Fundamentals",
      description: "Master the core concepts of web development and build your first website.",
      image: "https://img.freepik.com/free-vector/flat-design-online-courses-illustration_23-2148528493.jpg?t=st=1729503847~exp=1729507447~hmac=d9e867749e32b0f3d63260d06ff8e0883fbc0a802b59817afb8e137e1d2c3fdd&w=740",
      author: "Jane Smith"
    },
    {
      title: "Data Science Essentials",
      description: "Explore the world of data science and learn key analytical techniques.",
      image: "https://img.freepik.com/free-vector/flat-design-online-courses-illustration_23-2148528493.jpg?t=st=1729503847~exp=1729507447~hmac=d9e867749e32b0f3d63260d06ff8e0883fbc0a802b59817afb8e137e1d2c3fdd&w=740",
      author: "Alan Walker"
    },
    {
      title: "Mobile App Development",
      description: "Create your own mobile applications for iOS and Android platforms.",
      image: "https://img.freepik.com/free-vector/flat-design-online-courses-illustration_23-2148528493.jpg?t=st=1729503847~exp=1729507447~hmac=d9e867749e32b0f3d63260d06ff8e0883fbc0a802b59817afb8e137e1d2c3fdd&w=740",
      author: "Sara Lee"
    },
  ]

  return (
    <div>
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-8 md:px-16">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-gray-800">Our Courses</h2>
            <p className="text-lg text-gray-600 mt-4">
              Explore a variety of courses designed to help you master new skills and excel in your field. 
              Whether you are a beginner or an expert, we have something for everyone.
            </p>
          </div>
          
          <div className="flex justify-end mb-8">
            <Link to={'/courses'} className="bg-gray-500 text-white font-semibold py-2 px-8 rounded-md transition-transform hover:scale-105">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden shadow-lg transform transition-transform hover:scale-105 rounded-lg">
                <div className="relative h-64">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity hover:bg-opacity-20"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold mb-3 text-black">{course.title}</h3>
                    <p className="text-sm text-gray-800 mb-6 border-l-4 pl-2 rounded-md font-bold">{course.author}</p>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>

                  <Button className="w-full text-white font-semibold py-2 rounded-md transition-transform hover:scale-105"
                    variant="default">
                    Get It Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


export default FewCourses