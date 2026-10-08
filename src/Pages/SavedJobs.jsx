import { useEffect, useState } from "react";
import { MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SavedJobs = () => {
  const { user } = useAuth0();

  const defaultJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 10 LPA",
    },
    {
      id: 2,
      title: "Java Developer",
      company: "Infosys",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹5 - 9 LPA",
    },
    {
      id: 3,
      title: "React Developer",
      company: "TCS",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 12 LPA",
    },
    {
      id: 4,
      title: "Software Tester",
      company: "Value Momentum",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹4 - 7 LPA",
    },
    {
      id: 5,
      title: "Backend Developer",
      company: "Wipro",
      location: "Pune",
      type: "Full Time",
      salary: "₹5 - 9 LPA",
    },
    {
      id: 6,
      title: "Automation Test Engineer",
      company: "GlobalLogic",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹5 - 8 LPA",
    },
    {
      id: 7,
      title: "Data Analyst",
      company: "Deloitte",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 10 LPA",
    },
    {
      id: 8,
      title: "Data Scientist",
      company: "Accenture",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹8 - 14 LPA",
    },
    {
      id: 9,
      title: "UI/UX Designer",
      company: "Microsoft",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹7 - 12 LPA",
    },
    {
      id: 10,
      title: "Product Designer",
      company: "Amazon",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹8 - 13 LPA",
    },
  ];

  const postedJobs =
    JSON.parse(localStorage.getItem("postedJobs")) || [];

  const jobs = [...defaultJobs, ...postedJobs];

  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    if (!user?.sub) {
      setSavedJobs([]);
      return;
    }

    const saved = localStorage.getItem(
      `savedJobs_${user.sub}`
    );

    setSavedJobs(saved ? JSON.parse(saved) : []);
  }, [user]);

  const removeJob = (id) => {
    const updated = savedJobs.filter(
      (jobId) => jobId !== id
    );

    setSavedJobs(updated);

    localStorage.setItem(
      `savedJobs_${user.sub}`,
      JSON.stringify(updated)
    );
  };

  const savedJobDetails = jobs.filter((job) =>
    savedJobs.includes(job.id)
  );

  return (
    <main className="jobs-page">

      <div className="jobs-header">
        <h1>Saved Jobs</h1>

        <p>
          Jobs you saved for later.
        </p>
      </div>

      {savedJobDetails.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        savedJobDetails.map((job) => (
          <div
            className="job-card"
            key={job.id}
          >
            <div className="job-info">

              <Link to={`/jobs/${job.id}`}>
                <h2>{job.title}</h2>
              </Link>

              <h3>{job.company}</h3>

              <p>
                <MapPin size={16} />
                {job.location}
              </p>

              <span>{job.type}</span>

              <span>{job.salary}</span>

            </div>

            <button
              className="save-btn"
              onClick={() => removeJob(job.id)}
              title="Remove from saved jobs"
            >
              <Heart
                size={22}
                fill="currentColor"
              />
            </button>
          </div>
        ))
      )}

    </main>
  );
};

export default SavedJobs;