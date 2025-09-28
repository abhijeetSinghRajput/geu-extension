import React from "react";
import { StudentProfile } from "./profile/StudentProfile";
import {
  GraduationCap,
  IndianRupee,
  Bell,
  FileText,
  Briefcase,
  Building,
  MessageSquare,
} from "lucide-react";

const homepageLinks = [
  {
    title: "Academic",
    href: "https://student.geu.ac.in/Account/Cyborg_StudentHome?AppType=1&ApplicationType=Academic",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Fee",
    href: "https://student.geu.ac.in/Account/Cyborg_StudentHome?AppType=2&ApplicationType=Fee",
    icon: IndianRupee,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Circular",
    href: "https://student.geu.ac.in/Account/Cyborg_StudentHome?AppType=3&ApplicationType=Circular",
    icon: Bell,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Exam",
    href: "https://student.geu.ac.in/Account/Cyborg_StudentHome?AppType=6&ApplicationType=Exam",
    icon: FileText,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Placement",
    href: "https://student.geu.ac.in/Account/Cyborg_StudentHome?AppType=7&ApplicationType=Placement",
    icon: Briefcase,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Hostel",
    href: "https://student.geu.ac.in/Account/Cyborg_StudentHome?AppType=9&ApplicationType=Hostel",
    icon: Building,
    color: "from-teal-500 to-green-400",
  },
  {
    title: "Grievance",
    href: "https://student.geu.ac.in/Account/Cyborg_StudentHome?AppType=10&ApplicationType=Grievance",
    icon: MessageSquare,
    color: "from-red-500 to-pink-500",
  },
];

const Homepage = () => {
  return (
    <div className="bg-background p-[16px] sm:p-[24px] mb-[100px]">
      <div className="max-w-screen-lg mx-auto">
        {/* Profile */}
        <div className="mb-8">
          <StudentProfile />
        </div>

        {/* Grid */}
        <div className="grid gap-[8px] lg:gap-[16px] grid-cols-3 lg:grid-cols-4">
          {homepageLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition duration-300`}
              />
              <div className="relative z-10 flex flex-col items-center text-white">
                <item.icon className="h-[40px] w-[40px] mb-[20px]" />
                <span className="text-[18px] font-semibold">{item.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
