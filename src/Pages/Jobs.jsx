import { useEffect, useState } from "react";
import { Search, MapPin, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Jobs = () => {
  const [searchParams] = useSearchParams();

  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [jobType, setJobType] = useState("");

  const [savedJobs, setSavedJobs] = useState([]);

  const defaultJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 10 LPA",
      category: "Software Development",
    },
    {
      id: 2,
      title: "Java Developer",
      company: "Infosys",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹5 - 9 LPA",
      category: "Software Development",
    },
    {
      id: 3,
      title: "React Developer",
      company: "TCS",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 12 LPA",
      category: "Software Development",
    },
    {
      id: 4,
      title: "Software Tester",
      company: "Value Momentum",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹4 - 7 LPA",
      category: "Testing",
    },
    {
      id: 5,
      title: "Backend Developer",
      company: "Wipro",
      location: "Pune",
      type: "Full Time",
      salary: "₹5 - 9 LPA",
      category: "Software Development",
    },
    {
      id: 6,
      title: "Automation Test Engineer",
      company: "GlobalLogic",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹5 - 8 LPA",
      category: "Testing",
    },
    {
      id: 7,
      title: "Data Analyst",
      company: "Deloitte",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6 - 10 LPA",
      category: "Data & Analytics",
    },
    {
      id: 8,
      title: "Data Scientist",
      company: "Accenture",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹8 - 14 LPA",
      category: "Data & Analytics",
    },
    {
      id: 9,
      title: "UI/UX Designer",
      company: "Microsoft",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹7 - 12 LPA",
      category: "UI/UX Design",
    },
    {
      id: 10,
      title: "Product Designer",
      company: "Amazon",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹8 - 13 LPA",
      category: "UI/UX Design",
    },
  ];

  const postedJobs =
    JSON.parse(localStorage.getItem("postedJobs")) || [];

  const jobs = [...defaultJobs, ...postedJobs];

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

  const toggleSave = (id) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    setSavedJobs((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((jobId) => jobId !== id)
        : [...prev, id];

      localStorage.setItem(
        `savedJobs_${user.sub}`,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.category?.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchesType =
      !jobType || job.type === jobType;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType
    );
  });

  const clearSearch = () => {
    setSearch("");
    setLocation("");
    setJobType("");
  };

  return (
    <main className="jobs-page">
      <div className="jobs-header">
        <h1>Find Your Next Job</h1>

        <p>
          Explore opportunities that match your skills.
        </p>

        <div className="job-search">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search by job title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <MapPin size={20} />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <button
            type="button"
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>
      </div>

      <section className="job-list">
        <p>{filteredJobs.length} jobs found</p>

        {filteredJobs.length === 0 ? (
          <p>No jobs found. Try different filters.</p>
        ) : (
          filteredJobs.map((job) => (
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
                onClick={() => toggleSave(job.id)}
              >
                <Heart
                  size={22}
                  fill={
                    savedJobs.includes(job.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Jobs;