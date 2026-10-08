import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 10 LPA",
      category: "Software Development",
      description:
        "We are looking for a Frontend Developer to build responsive and user-friendly web applications.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      id: 2,
      title: "Java Developer",
      company: "Infosys",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹5 - 9 LPA",
      category: "Software Development",
      description:
        "Join our development team to build scalable applications using Java and modern technologies.",
      skills: ["Java", "Spring Boot", "SQL"],
    },
    {
      id: 3,
      title: "React Developer",
      company: "TCS",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 12 LPA",
      category: "Software Development",
      description:
        "Work on modern React applications and create responsive user experiences.",
      skills: ["React", "JavaScript", "HTML", "CSS"],
    },
    {
      id: 4,
      title: "Software Tester",
      company: "Value Momentum",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹4 - 7 LPA",
      category: "Testing",
      description:
        "Perform manual testing and ensure the quality and reliability of software applications.",
      skills: ["Manual Testing", "SQL", "API Testing"],
    },
    {
      id: 5,
      title: "Backend Developer",
      company: "Wipro",
      location: "Pune",
      type: "Full Time",
      salary: "₹5 - 9 LPA",
      category: "Software Development",
      description:
        "Develop and maintain backend services and APIs for business applications.",
      skills: ["Java", "Spring Boot", "MySQL", "REST API"],
    },
    {
      id: 6,
      title: "Automation Test Engineer",
      company: "GlobalLogic",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹5 - 8 LPA",
      category: "Testing",
      description:
        "Create and maintain automated test scripts to improve software quality.",
      skills: ["Selenium", "Java", "TestNG", "Automation Testing"],
    },
    {
      id: 7,
      title: "Data Analyst",
      company: "Deloitte",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 10 LPA",
      category: "Data & Analytics",
      description:
        "Analyze business data and create meaningful insights to support decision-making.",
      skills: ["SQL", "Excel", "Python", "Data Analysis"],
    },
    {
      id: 8,
      title: "Data Scientist",
      company: "Accenture",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹8 - 14 LPA",
      category: "Data & Analytics",
      description:
        "Work with large datasets and develop data-driven solutions for business problems.",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    },
    {
      id: 9,
      title: "UI/UX Designer",
      company: "Microsoft",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹7 - 12 LPA",
      category: "UI/UX Design",
      description:
        "Design intuitive and engaging user interfaces and experiences for digital products.",
      skills: ["Figma", "UI Design", "UX Design", "Prototyping"],
    },
    {
      id: 10,
      title: "Product Designer",
      company: "Amazon",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹8 - 13 LPA",
      category: "UI/UX Design",
      description:
        "Design user-focused digital products and collaborate with development teams.",
      skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    },
  ];

  const postedJobs =
    JSON.parse(localStorage.getItem("postedJobs")) || [];

  const jobs = [...defaultJobs, ...postedJobs];

  const job = jobs.find(
    (job) => job.id === Number(id)
  );

  if (!job) {
    return (
      <main className="jobs-page">
        <h1>Job not found</h1>
      </main>
    );
  }

  return (
    <main className="jobs-page">
      <div className="job-details-card">

        <h1>{job.title}</h1>

        <h3>{job.company}</h3>

        <p className="job-details-location">
          <MapPin size={18} />
          {job.location}
        </p>

        <div className="job-details-tags">
          <span>{job.type}</span>
          <span>{job.salary}</span>
          {job.category && <span>{job.category}</span>}
        </div>

        <div className="job-details-section">
          <h2>Description</h2>

          <p>
            {job.description ||
              `We are looking for a talented ${job.title} to join our team and contribute to exciting projects.`}
          </p>
        </div>

        <div className="job-details-section">
          <h2>Required Skills</h2>

          <div className="job-details-skills">
            {job.skills?.length > 0 ? (
              job.skills.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))
            ) : (
              <p>Skills not specified.</p>
            )}
          </div>
        </div>

        <div className="job-details-apply">
          <button
            onClick={() =>
              navigate(`/apply?jobId=${job.id}`)
            }
          >
            Apply Now
          </button>
        </div>

      </div>
    </main>
  );
};

export default JobDetails;