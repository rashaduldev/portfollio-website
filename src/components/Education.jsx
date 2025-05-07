import { FaGraduationCap } from "react-icons/fa";

const educationData = [
  {
    id: 1,
    title: "BSc in CSE",
    institution: "Green University of Bangladesh",
    duration: "2020 – 2024",
    color: "text-blue-600",
    dotColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "Diploma in Engineering",
    institution: "Dhaka Polytechnic Institute",
    duration: "2015 – 2019",
    color: "text-green-600",
    dotColor: "bg-green-500",
  },
  {
    id: 3,
    title: "SSC",
    institution: "Jamalpur Zilla School",
    duration: "2013",
    color: "text-yellow-600",
    dotColor: "bg-yellow-500",
  },
];

export default function EducationTimeline() {
  return (
    <section className="py-10 bg-white dark:bg-gray-900 px-5">
      <div className="relative border-l-2 border-gray-300 ml-5">
        {educationData.map((edu, index) => (
          <div key={edu.id} className="mb-12 ml-6 relative">
            {/* Dot */}
            <span
              className={`absolute -left-3 top-1.5 w-6 h-6 rounded-full border-4 ${edu.dotColor} border-white dark:border-gray-900`}
            ></span>

            {/* Line and Icon */}
            <div className="flex items-center gap-3 mb-2">
              <FaGraduationCap className={`text-xl ${edu.color}`} />
              <h3 className={`text-lg font-bold ${edu.color}`}>{`${(index + 1)
                .toString()
                .padStart(2, "0")}. ${edu.title}`}</h3>
            </div>

            {/* Institution & Duration */}
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {edu.institution}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{edu.duration}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
