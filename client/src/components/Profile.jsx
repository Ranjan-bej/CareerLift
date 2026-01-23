import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Camera,
  MapPin,
  Edit2,
  Save,
  Loader2,
  Trash2,
  FileText,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "./ui/button";
import { JobDetails } from "./JobDetails";
import { API_BASE_URL } from "../apiConfig";

const inputClass =
  "w-full bg-white/70 backdrop-blur-sm border border-purple-200/60 rounded-xl px-5 py-3 text-gray-800 text-[15px] font-medium placeholder-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40 hover:border-purple-300";

const textareaClass = `${inputClass} resize-none leading-relaxed`;

export function Profile() {
  const fileInputRef = useRef(null);

  // Safe parse user from localStorage
  let parsedUser = {};
  try {
    parsedUser = JSON.parse(localStorage.getItem("user") || "null") || {};
  } catch (err) {
    parsedUser = {};
  }
  const currentUser = parsedUser || {};
  const email = currentUser.email || "";

  // Profile state
  const [profile, setProfile] = useState({
    name: currentUser.name || "",
    title: "",
    location: "",
    bio: "",
    avatar: ""
  });
  const [editingProfile, setEditingProfile] = useState(false);

  // Contact
  const [contact, setContact] = useState({
    email,
    phone: "",
    alternateEmail: ""
  });
  const [contactSaved, setContactSaved] = useState(false);

  // Resume
  const [resume, setResume] = useState(null);
  const [resumeSaved, setResumeSaved] = useState(false);

  // Lists
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [expForm, setExpForm] = useState(null);
  const [educations, setEducations] = useState([]);
  const [eduForm, setEduForm] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [certForm, setCertForm] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState(null);

  // Saved jobs: array of job objects (persisted in backend)
  const [savedJobs, setSavedJobs] = useState([]);

  const [saving, setSaving] = useState(false);

  // For opening JobDetails from profile saved jobs
  const [selectedSavedJob, setSelectedSavedJob] = useState(null);

  // Load profile on mount (and whenever email changes)
  useEffect(() => {
    if (!email) return;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile/${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        setProfile(data.profile || { name: currentUser.name || "", title: "", location: "", bio: "", avatar: "" });
        setContact(data.contact || { email });
        setResume(data.resume || null);
        setSkills(data.skills || []);
        setExperiences(data.experiences || []);
        setEducations(data.educations || []);
        setCertifications(data.certifications || []);
        setProjects(data.projects || []);
        setSavedJobs(Array.isArray(data.savedJobs) ? data.savedJobs : []);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // Save whole profile (PUT). Includes savedJobs so saves/unsaves reflect in backend.
  const saveAll = async () => {
    if (!email) {
      console.warn("No email present - cannot save");
      return;
    }
    setSaving(true);

    // Abort if taking too long
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const payload = {
        profile,
        contact,
        resume,
        skills,
        experiences,
        educations,
        certifications,
        projects,
        savedJobs
      };

      const res = await fetch(`${API_BASE_URL}/api/profile/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (!res.ok) {
        console.error("Failed to save profile:", res.status, await res.text().catch(() => ""));
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.error("Save request timed out");
      } else {
        console.error("Error saving profile:", err);
      }
    } finally {
      clearTimeout(timeout);
      setSaving(false);
    }
  };

  // Unsave a job from profile savedJobs (event passed so we can stopPropagation)
  const handleUnsaveFromProfile = async (e, jobId) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!email) return;

    try {
      // Fetch current profile to avoid overwriting other fields
      const profRes = await fetch(`${API_BASE_URL}/api/profile/${encodeURIComponent(email)}`);
      if (!profRes.ok) throw new Error("Failed to fetch profile before unsaving");
      const profileData = await profRes.json();

      const existingSaved = Array.isArray(profileData.savedJobs) ? profileData.savedJobs.slice() : [];
      const newSaved = existingSaved.filter(j => String(j.id) !== String(jobId));

      const payload = {
        profile: profileData.profile || {},
        contact: profileData.contact || { email },
        resume: profileData.resume || null,
        skills: profileData.skills || [],
        experiences: profileData.experiences || [],
        educations: profileData.educations || [],
        certifications: profileData.certifications || [],
        projects: profileData.projects || [],
        savedJobs: newSaved
      };

      const putRes = await fetch(`${API_BASE_URL}/api/profile/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!putRes.ok) {
        console.error("Failed to update profile when unsaving", await putRes.text().catch(() => ""));
        return;
      }

      // Update local state to reflect removal immediately
      setSavedJobs(newSaved);
    } catch (err) {
      console.error("Error unsaving job from profile:", err);
    }
  };

  // Avatar upload handler
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfile(prev => ({ ...prev, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  // Generic render for lists (Experience, Education, etc.)
  const renderListCard = (title, list, setList, form, setForm, fields) => (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      {list.map((item, i) => (
        <div key={i} className="flex justify-between mb-4">
          <div className="space-y-1">
            {Object.values(item).map((v, idx) => (
              <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                {v}
              </p>
            ))}
          </div>
          <Trash2
            className="cursor-pointer text-gray-400 hover:text-red-500"
            onClick={() => setList(list.filter((_, idx) => idx !== i))}
          />
        </div>
      ))}

      {form ? (
        <div className="space-y-4">
          {fields.map(f => (
            <input
              key={f}
              className={inputClass}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={form[f] || ""}
              onChange={e => setForm({ ...form, [f]: e.target.value })}
            />
          ))}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setForm(null)}>Cancel</Button>
            <Button onClick={() => { setList([...list, form]); setForm(null); }}>Save</Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setForm({})}>Add {title}</Button>
      )}
    </div>
  );

  // If user opened a saved job, show JobDetails
  if (selectedSavedJob) {
    return <JobDetails job={selectedSavedJob} onBack={() => setSelectedSavedJob(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* PROFILE HEADER */}
        <motion.div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300" />
          <div className="p-6">
            <div className="flex justify-between items-start -mt-20 mb-4">
              <div className="relative">
                <div className="w-36 h-36 bg-white rounded-full border-4 overflow-hidden flex items-center justify-center shadow-md">
                  {profile.avatar ? (
                    <img src={profile.avatar} className="w-full h-full object-cover" alt="avatar" />
                  ) : (
                    <User className="w-16 h-16 text-gray-300" />
                  )}
                </div>
                {editingProfile && (
                  <button onClick={() => fileInputRef.current.click()} className="absolute bottom-2 right-2 bg-purple-500 p-2 rounded-full text-white shadow-md">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input ref={fileInputRef} type="file" hidden onChange={handleAvatar} />
              </div>

              {!editingProfile && (
                <button onClick={() => setEditingProfile(true)} className="mt-20 flex items-center gap-2 text-gray-700 font-medium">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>

            {!editingProfile ? (
              <>
                <h1 className="text-3xl font-semibold text-gray-900">{profile.name}</h1>
                <p className="text-lg text-gray-700 mt-1">{profile.title}</p>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="w-4 h-4" /> {profile.location}
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">{profile.bio}</p>
              </>
            ) : (
              <div className="space-y-4">
                <input className={inputClass} placeholder="Enter your full name" value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })} />
                <input className={inputClass} placeholder="Title (e.g., Frontend Developer)"
                  value={profile.title}
                  onChange={e => setProfile({ ...profile, title: e.target.value })} />
                <input className={inputClass} placeholder="Location (city, state)"
                  value={profile.location}
                  onChange={e => setProfile({ ...profile, location: e.target.value })} />
                <textarea className={textareaClass}
                  placeholder="Write a short professional summary."
                  value={profile.bio}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })} />
                <div className="flex gap-3">
                  <Button onClick={() => { saveAll(); setEditingProfile(false); }}>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProfile(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {renderListCard("Education", educations, setEducations, eduForm, setEduForm, ["institution", "degree", "duration", "score"])}
        {renderListCard("Experience", experiences, setExperiences, expForm, setExpForm, ["role", "company", "type", "duration"])}
        {renderListCard("Projects", projects, setProjects, projectForm, setProjectForm, ["title", "tech", "description", "link"])}
        {renderListCard("Certifications", certifications, setCertifications, certForm, setCertForm, ["name", "organization", "year"])}

        {/* SKILLS */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {skills.map((s, i) => (
              <span key={i} className="bg-purple-100/70 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                {s}
                <Trash2 size={14} className="cursor-pointer hover:text-red-500" onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} />
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <input className={inputClass} placeholder="Add a skill (e.g., React)" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
            <Button onClick={() => {
              if (!skillInput) return;
              setSkills([...skills, skillInput]);
              setSkillInput("");
            }}>
              Add Skill
            </Button>
          </div>
        </div>

        {/* RESUME */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Resume
          </h2>

          {!resume ? (
            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center cursor-pointer hover:bg-purple-50">
              <p className="text-purple-600 font-medium">Click to upload resume</p>
              <p className="text-sm text-gray-500 mt-1">PDF format only</p>
              <input type="file" ref={fileInputRef} hidden accept="application/pdf" onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => { setResume({ name: file.name, data: reader.result }); setResumeSaved(false); };
                reader.readAsDataURL(file);
              }} />
            </div>
          ) : (
            <div className="flex justify-between items-center bg-purple-50 p-4 rounded-xl">
              <div>
                <p className="font-medium text-gray-800">Resume added successfully</p>
                <button className="text-sm text-purple-600 underline" onClick={() => window.open(resume.data)}>{resume.name}</button>
              </div>
              <Button variant="outline" onClick={() => setResume(null)}>Delete</Button>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button onClick={() => { saveAll(); setResumeSaved(true); }}>
              Save Resume
            </Button>
          </div>
        </div>

        {/* CONTACT */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Contact Details</h2>

          {!contactSaved ? (
            <>
              <input disabled value={contact.email} className={`${inputClass} bg-gray-100 mb-3`} />
              <input className={`${inputClass} mb-3`} placeholder="Phone number" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
              <input className={inputClass} placeholder="Alternate email address" value={contact.alternateEmail} onChange={e => setContact({ ...contact, alternateEmail: e.target.value })} />

              <div className="flex justify-end mt-4">
                <Button onClick={() => { saveAll(); setContactSaved(true); }}>Save Contact Details</Button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3"><Mail className="text-purple-600" /> {contact.email}</div>
              {contact.phone && <div className="flex items-center gap-3"><Phone className="text-purple-600" /> {contact.phone}</div>}
              {contact.alternateEmail && <div className="flex items-center gap-3"><Mail className="text-purple-600" /> {contact.alternateEmail}</div>}
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => setContactSaved(false)}>Edit</Button>
                <Button variant="outline" onClick={() => { setContact({ email, phone: "", alternateEmail: "" }); setContactSaved(false); }}>Delete</Button>
              </div>
            </div>
          )}
        </div>

        {/* SAVED JOBS */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Saved Jobs</h2>

          {savedJobs.length === 0 ? (
            <p className="text-sm text-gray-600">No saved jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedJobs.map((job) => (
                <div
                  key={String(job.id)}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => setSelectedSavedJob(job)}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className={`w-14 h-14 ${job.color || 'bg-gray-300'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xl font-bold">{job.companyInitial || (job.company || '').charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-100 rounded-lg text-xs">{job.type}</span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg text-xs">{job.salary}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={(e) => handleUnsaveFromProfile(e, job.id)}
                        aria-label="Unsave job"
                      >
                        <Trash2 />
                      </button>
                      <span className="text-xs text-gray-400 mt-2">{job.postedDays ? `${job.postedDays}d ago` : ''}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SAVE ALL */}
        <div className="flex justify-end">
          <Button onClick={saveAll}>
            {saving ? <Loader2 className="animate-spin w-4 h-4" /> : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}