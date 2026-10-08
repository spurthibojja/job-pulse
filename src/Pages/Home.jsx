import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  Code2,
  TestTube2,
  BarChart3,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const categories = [
    {
      title: "Software Development",
      jobs: "120+ Jobs",
      icon: Code2,
      search: "Software Development",
    },
    {
      title: "Testing",
      jobs: "65+ Jobs",
      icon: TestTube2,
      search: "Testing",
    },
    {
      title: "Data & Analytics",
      jobs: "80+ Jobs",
      icon: BarChart3,
      search: "Data & Analytics",
    },
    {
      title: "UI/UX Design",
      jobs: "45+ Jobs",
      icon: Palette,
      search: "UI/UX Design",
    },
  ];

  return (
    <main className="home">

      {/* HERO */}

      <section className="hero">
        <div className="hero-badge">
          <span></span>
          Find your next opportunity
        </div>

        <h1>
          Find Your Dream <span>Job</span>
        </h1>

        <p>
          Discover the right opportunity and build your career.
        </p>

        <div className="hero-search">
          <div>
            <Search size={20} />

            <input
              placeholder="Job title, skills or keywords"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div>
            <MapPin size={20} />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <Link
            to={`/jobs?search=${encodeURIComponent(
              keyword
            )}&location=${encodeURIComponent(location)}`}
          >
            Search Jobs
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="hero-trust">
          <span>Explore opportunities</span>
          <span>•</span>
          <span>Apply with confidence</span>
          <span>•</span>
          <span>Build your career</span>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="categories">
        <div className="section-top">
          <div>
            <p className="section-eyebrow">
              EXPLORE OPPORTUNITIES
            </p>

            <h2>Find work that fits your skills.</h2>

            <p className="section-description">
              Explore popular career categories and discover
              opportunities that match your interests.
            </p>
          </div>

          <Link to="/jobs" className="view-all-link">
            View all jobs
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="category-list">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                to={`/jobs?search=${encodeURIComponent(
                  category.search
                )}`}
                className="category-card"
              >
                <div className="category-icon">
                  <Icon size={21} />
                </div>

                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.jobs}</p>
                </div>

                <ArrowUpRight
                  className="category-arrow"
                  size={18}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* STATS */}

      <section className="home-stats">
        <div>
          <strong>500+</strong>
          <span>Job Opportunities</span>
        </div>

        <div>
          <strong>100+</strong>
          <span>Companies</span>
        </div>

        <div>
          <strong>20+</strong>
          <span>Career Categories</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Opportunity Discovery</span>
        </div>
      </section>

      {/* CTA */}

      <section className="home-cta">
        <div>
          <p className="section-eyebrow">
            YOUR NEXT MOVE
          </p>

          <h2>
            Your next opportunity
            <span> starts here.</span>
          </h2>

          <p>
            Explore jobs, save the ones you like,
            and keep track of every application in one place.
          </p>
        </div>

        <Link to="/jobs" className="cta-button">
          Explore Jobs
          <ArrowUpRight size={17} />
        </Link>
      </section>

    </main>
  );
};

export default Home;