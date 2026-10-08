import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    phone: "",
    location: "",
    skills: "",
  });

  useEffect(() => {
    if (!user?.sub) return;

    const saved = localStorage.getItem(
      `profile_${user.sub}`
    );

    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      `profile_${user.sub}`,
      JSON.stringify(profile)
    );

    setEditing(false);
  };

  return (
    <main className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">👤</div>

        <h1>My Profile</h1>

        <div className="profile-info">

          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          {editing ? (
            <>
              <p>
                <strong>Phone:</strong>

                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </p>

              <p>
                <strong>Location:</strong>

                <input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
              </p>

              <p>
                <strong>Skills:</strong>

                <input
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, Selenium"
                />
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Phone:</strong>{" "}
                {profile.phone || "Not added"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {profile.location || "Not added"}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {profile.skills || "Not added"}
              </p>
            </>
          )}

        </div>

        {editing ? (
          <button
            className="edit-profile-btn"
            onClick={handleSave}
          >
            Save Profile
          </button>
        ) : (
          <button
            className="edit-profile-btn"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}

      </div>
    </main>
  );
};

export default Profile;