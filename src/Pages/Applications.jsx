import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const Applications = () => {
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

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user?.sub) {
      setApplications([]);
      return;
    }

    const saved = localStorage.getItem(
      `applications_${user.sub}`
    );

    setApplications(saved ? JSON.parse(saved) : []);
  }, [user]);

  const postedJobs =
    JSON.parse(localStorage.getItem("postedJobs")) || [];

  const jobs = [...defaultJobs, ...postedJobs];

  const applicationData = useMemo(() => {
    return applications.map((application) => {
      const job = jobs.find(
        (job) => job.id === Number(application.jobId)
      );

      return {
        ...application,
        job,
      };
    });
  }, [applications]);

  const appliedCount = applications.length;

  const reviewCount = applications.filter(
    (application) =>
      application.status === "Under Review"
  ).length;

  const interviewCount = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (application) =>
      application.status === "Selected"
  ).length;

  const getInitials = (company = "") => {
    return company
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "status-selected";

      case "Interview":
        return "status-interview";

      case "Under Review":
        return "status-review";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-applied";
    }
  };

  const getProgress = (status) => {
    switch (status) {
      case "Selected":
        return 100;

      case "Interview":
        return 75;

      case "Under Review":
        return 50;

      case "Rejected":
        return 100;

      default:
        return 25;
    }
  };

  const formatDate = (id) => {
    if (!id) return "Recently";

    const date = new Date(Number(id));

    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="applications-page">

      {/* HEADER */}

      <section className="applications-hero">

        <div>
          <p className="eyebrow">
            APPLICATION CENTER
          </p>

          <h1>
            Your career,
            <span> in progress.</span>
          </h1>

          <p className="applications-subtitle">
            Keep track of every opportunity you've
            applied for and follow your progress.
          </p>
        </div>

      </section>


      {/* STATISTICS */}

      <section className="application-stats">

        <div className="application-stat">
          <span className="stat-number">
            {appliedCount}
          </span>

          <span className="stat-label">
            Total Applied
          </span>
        </div>

        <div className="application-stat">
          <span className="stat-number">
            {reviewCount}
          </span>

          <span className="stat-label">
            Under Review
          </span>
        </div>

        <div className="application-stat">
          <span className="stat-number">
            {interviewCount}
          </span>

          <span className="stat-label">
            Interviews
          </span>
        </div>

        <div className="application-stat">
          <span className="stat-number">
            {selectedCount}
          </span>

          <span className="stat-label">
            Selected
          </span>
        </div>

      </section>


      {/* APPLICATIONS */}

      <section className="applications-section">

        <div className="section-heading">

          <div>
            <h2>Application Activity</h2>

            <p>
              Your latest applications and their current status.
            </p>
          </div>

          <span className="application-count">
            {applications.length}{" "}
            {applications.length === 1
              ? "application"
              : "applications"}
          </span>

        </div>


        {applicationData.length === 0 ? (

          <div className="applications-empty">

            <div className="empty-line"></div>

            <h2>
              Your next opportunity starts here.
            </h2>

            <p>
              Explore jobs that match your skills and
              start building your career.
            </p>

            <Link
              to="/jobs"
              className="explore-jobs-btn"
            >
              Explore Jobs
              <ArrowUpRight size={17} />
            </Link>

          </div>

        ) : (

          <div className="application-list">

            {applicationData.map(
              (application, index) => {

                const job = application.job;

                const status =
                  application.status || "Applied";

                return (
                  <article
                    className="application-card"
                    key={application.id}
                    style={{
                      "--delay": `${index * 80}ms`,
                    }}
                  >

                    {/* COMPANY */}

                    <div className="company-mark">
                      {getInitials(
                        job?.company || "Company"
                      )}
                    </div>


                    {/* MAIN CONTENT */}

                    <div className="application-main">

                      <div className="application-top">

                        <div>

                          <Link
                            to={
                              job
                                ? `/jobs/${job.id}`
                                : "/jobs"
                            }
                            className="application-title"
                          >
                            {job?.title ||
                              "Job not found"}
                          </Link>

                          <p className="application-company">
                            {job?.company ||
                              "Unknown Company"}
                          </p>

                        </div>


                        <span
                          className={`application-status ${getStatusClass(
                            status
                          )}`}
                        >
                          <span></span>
                          {status}
                        </span>

                      </div>


                      {/* META */}

                      <div className="application-meta">

                        <span>
                          <MapPin size={15} />
                          {job?.location ||
                            "Location unavailable"}
                        </span>

                        {job?.type && (
                          <span>
                            {job.type}
                          </span>
                        )}

                        {job?.salary && (
                          <span>
                            {job.salary}
                          </span>
                        )}

                        <span>
                          Applied{" "}
                          {formatDate(
                            application.id
                          )}
                        </span>

                      </div>


                      {/* TIMELINE */}

                      <div className="application-progress">

                        <div className="progress-track">

                          <div
                            className={`progress-fill ${getStatusClass(
                              status
                            )}`}
                            style={{
                              width: `${getProgress(
                                status
                              )}%`,
                            }}
                          />

                        </div>


                        <div className="progress-labels">

                          <span
                            className={
                              getProgress(status) >=
                              25
                                ? "active"
                                : ""
                            }
                          >
                            Applied
                          </span>

                          <span
                            className={
                              getProgress(status) >=
                              50
                                ? "active"
                                : ""
                            }
                          >
                            Review
                          </span>

                          <span
                            className={
                              getProgress(status) >=
                              75
                                ? "active"
                                : ""
                            }
                          >
                            Interview
                          </span>

                          <span
                            className={
                              getProgress(status) >=
                              100
                                ? "active"
                                : ""
                            }
                          >
                            Decision
                          </span>

                        </div>

                      </div>


                      {/* FOOTER */}

                      <div className="application-footer">

                        <span className="application-note">
                          Application submitted successfully
                        </span>

                        {job && (
                          <Link
                            to={`/jobs/${job.id}`}
                            className="view-application"
                          >
                            View Opportunity
                            <ArrowUpRight size={15} />
                          </Link>
                        )}

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        )}

      </section>

    </main>
  );
};

export default Applications;