import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { BookOpen, Code, LineChart, Smartphone } from "lucide-react"

const FewCourses=() =>{
  const courses = [
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming with this comprehensive course.",
      icon: Code,
      author: "John Doe"
    },
    {
      title: "Web Development Fundamentals",
      description: "Master the core concepts of web development and build your first website.",
      icon: BookOpen,
      author: "Jane Smith"
    },
    {
      title: "Data Science Essentials",
      description: "Explore the world of data science and learn key analytical techniques.",
      icon: LineChart,
      author: "Alan Walker"
    },
    {
      title: "Mobile App Development",
      description: "Create your own mobile applications for iOS and Android platforms.",
      icon: Smartphone,
      author: "Sara Lee"
    },
  ]

  return (
    <div>
      <section className="py-24 bg-ink-50">
        <div className="container mx-auto px-8 md:px-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-900">Our Courses</h2>
            <p className="text-lg text-ink-600 mt-4 max-w-2xl mx-auto">
              Explore a variety of courses designed to help you master new skills and excel in your field.
              Whether you are a beginner or an expert, we have something for everyone.
            </p>
          </div>

          <div className="flex justify-end mb-8">
            <Link to={'/courses'} className="bg-brand-500 text-white font-semibold py-2.5 px-8 rounded-lg shadow-sm hover:bg-brand-600 hover:shadow-glow transition-all">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-300 hover:border-brand-300 hover:shadow-glow hover:-translate-y-1">
                <div className="relative h-36 bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <course.icon className="h-14 w-14 text-white/90" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-ink-900">{course.title}</h3>
                  </div>
                  <p className="text-sm text-brand-600 font-medium mb-3">By {course.author}</p>
                  <p className="text-ink-600 mb-5 leading-relaxed text-sm">{course.description}</p>

                  <Button className="w-full">
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