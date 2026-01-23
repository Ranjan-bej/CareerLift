const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

async function readUsersFile() {
  try {
    const txt = await fs.readFile(USERS_FILE, 'utf8');
    return txt ? JSON.parse(txt) : [];
  } catch (err) {
    // If file missing or invalid, return empty array
    return [];
  }
}

async function writeUsersFile(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

async function getProfile(req, res) {
  try {
    const email = req.params.email;
    if (!email) return res.status(400).json({ message: 'Missing email' });

    const users = await readUsersFile();
    const user = users.find(u => String(u.email) === String(email));

    if (!user) {
      // Return default empty schema so frontend can rely on fields
      return res.json({
        profile: { name: '', title: '', location: '', bio: '', avatar: '' },
        contact: { email },
        resume: null,
        skills: [],
        experiences: [],
        educations: [],
        certifications: [],
        projects: [],
        savedJobs: []
      });
    }

    return res.json({
      profile: user.profile || {},
      contact: user.contact || { email: user.email },
      resume: user.resume || null,
      skills: user.skills || [],
      experiences: user.experiences || [],
      educations: user.educations || [],
      certifications: user.certifications || [],
      projects: user.projects || [],
      savedJobs: user.savedJobs || []
    });
  } catch (err) {
    console.error('getProfile error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateProfile(req, res) {
  try {
    const email = req.params.email;
    if (!email) return res.status(400).json({ message: 'Missing email' });

    const payload = req.body || {};
    const users = await readUsersFile();
    const idx = users.findIndex(u => String(u.email) === String(email));

    if (idx === -1) {
      // Create a new user entry
      const newUser = {
        email,
        profile: payload.profile || {},
        contact: payload.contact || { email },
        resume: payload.resume || null,
        skills: payload.skills || [],
        experiences: payload.experiences || [],
        educations: payload.educations || [],
        certifications: payload.certifications || [],
        projects: payload.projects || [],
        savedJobs: payload.savedJobs || []
      };
      users.push(newUser);
    } else {
      // Merge updates — only replace fields provided in payload
      const existing = users[idx];
      users[idx] = {
        ...existing,
        profile: payload.profile !== undefined ? payload.profile : existing.profile,
        contact: payload.contact !== undefined ? payload.contact : existing.contact,
        resume: payload.resume !== undefined ? payload.resume : existing.resume,
        skills: payload.skills !== undefined ? payload.skills : existing.skills,
        experiences: payload.experiences !== undefined ? payload.experiences : existing.experiences,
        educations: payload.educations !== undefined ? payload.educations : existing.educations,
        certifications: payload.certifications !== undefined ? payload.certifications : existing.certifications,
        projects: payload.projects !== undefined ? payload.projects : existing.projects,
        savedJobs: payload.savedJobs !== undefined ? payload.savedJobs : existing.savedJobs || []
      };
    }

    await writeUsersFile(users);
    return res.json({ ok: true });
  } catch (err) {
    console.error('updateProfile error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Export explicitly as an object so require() gets the functions
module.exports = {
  getProfile,
  updateProfile
};