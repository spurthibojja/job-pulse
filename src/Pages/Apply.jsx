import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Apply = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user } = useAuth0();

  const jobId = Number(searchParams.get("jobId"));

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    resume: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const application = {
      id: Date.now(),
      userId: user.sub,
      jobId,
      ...form,
      status: "Applied",
    };

    const storageKey = `applications_${user.sub}`;

    const existing =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    localStorage.setItem(
      storageKey,
      JSON.stringify([...existing, application])
    );

    navigate("/applications");
  };

  return (
    <main className="apply-page">
      <div className="apply-form">

        <h1>Apply for Job</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="resume"
            placeholder="Resume URL"
            value={form.resume}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Application
          </button>

        </form>

      </div>
    </main>
  );
};

export default Apply;