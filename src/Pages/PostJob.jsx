import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full Time",
    category: "Software Development",
    salary: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      userId: user.sub,
      ...form,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim()),
    };

    const existingJobs =
      JSON.parse(localStorage.getItem("postedJobs")) || [];

    localStorage.setItem(
      "postedJobs",
      JSON.stringify([...existingJobs, newJob])
    );

    alert("Job posted successfully!");

    navigate("/jobs");
  };

  return (
    <main className="apply-page">
      <div className="apply-form">
        <h1>Post a Job</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Software Development</option>
            <option>Testing</option>
            <option>Data & Analytics</option>
            <option>UI/UX Design</option>
          </select>

          <input
            name="salary"
            placeholder="Salary (e.g. ₹6 - 10 LPA)"
            value={form.salary}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <input
            name="skills"
            placeholder="Skills (React, JavaScript, HTML)"
            value={form.skills}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Post Job
          </button>
        </form>
      </div>
    </main>
  );
};

export default PostJob;