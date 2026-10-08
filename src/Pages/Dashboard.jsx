import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user } = useAuth0();

  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    if (!user?.sub) {
      setApplications([]);
      setSavedJobs([]);
      setPostedJobs([]);
      return;
    }

    const applicationsData =
      JSON.parse(
        localStorage.getItem(`applications_${user.sub}`)
      ) || [];

    const savedJobsData =
      JSON.parse(
        localStorage.getItem(`savedJobs_${user.sub}`)
      ) || [];

    const allPostedJobs =
      JSON.parse(localStorage.getItem("postedJobs")) || [];

    const postedJobsData = allPostedJobs.filter(
      (job) => job.userId === user.sub
    );

    setApplications(applicationsData);
    setSavedJobs(savedJobsData);
    setPostedJobs(postedJobsData);
  }, [user]);

  return (
    <main className="dashboard-page">

      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Track your job search activity.</p>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>{applications.length}</h2>
          <p>Applied Jobs</p>
        </div>

        <div className="dashboard-card">
          <h2>{savedJobs.length}</h2>
          <p>Saved Jobs</p>
        </div>

        <div className="dashboard-card">
          <h2>{postedJobs.length}</h2>
          <p>Posted Jobs</p>
        </div>

      </div>

      <div className="dashboard-info">

        <h2>Activity Overview</h2>

        <p>
          You have applied to{" "}
          <strong>{applications.length}</strong> jobs.
        </p>

        <p>
          You have saved{" "}
          <strong>{savedJobs.length}</strong> jobs.
        </p>

        <p>
          You have posted{" "}
          <strong>{postedJobs.length}</strong> jobs.
        </p>

      </div>

    </main>
  );
};

export default Dashboard;