const path = require('path');
const { readData } = require('../utils/fileHelper');

const DATA_DIR = path.join(__dirname, '../data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Helper to read users
async function readUsers(email) {
    try {
        const txt = await require('fs').promises.readFile(USERS_FILE, 'utf8');
        const users = txt ? JSON.parse(txt) : [];
        return users.find(u => String(u.email) === String(email));
    } catch (err) { return null; }
}

function calculateATSScore(resumeText, job) {
    if (!resumeText) return 0;

    // Create a rich text representation of the job
    const relevantJobText = `${job.title} ${job.company} ${job.location} ${job.type} ${job.experience || ''} ${job.salary || ''}`;
    // Simple tokenization
    const resumeTokens = new Set(resumeText.toLowerCase().split(/\W+/));
    const jobTokens = relevantJobText.toLowerCase().split(/\W+/).filter(t => t.length > 2);

    let matchCount = 0;
    jobTokens.forEach(token => {
        if (resumeTokens.has(token)) matchCount++;
    });

    if (jobTokens.length === 0) return 0;
    const rawScore = Math.round((matchCount / jobTokens.length) * 100);

    // Normalize and boost. 
    return Math.min(98, Math.round(rawScore * 2.0 + 30));
}


exports.getJobs = async (req, res) => {
    try {
        const { title, location, type, experience, salary, sort, email } = req.query;
        let jobs = await readData(JOBS_FILE);

        let userResumeText = null;
        if (email) {
            const user = await readUsers(email);
            if (user && user.resume && user.resume.text) {
                userResumeText = user.resume.text;
            }
        }

        // Filtering
        if (title) {
            jobs = jobs.filter(job => job.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (location) {
            const locations = location.split(',').map(l => l.trim().toLowerCase());
            if (locations.length > 0 && locations[0] !== '') {
                jobs = jobs.filter(job => locations.some(loc => job.location.toLowerCase().includes(loc)));
            }
        }
        if (type) {
            const types = type.split(',').map(t => t.trim());
            if (types.length > 0 && types[0] !== '') {
                jobs = jobs.filter(job => types.includes(job.type));
            }
        }
        if (experience) {
            jobs = jobs.filter(job => job.experience === experience);
        }
        if (salary) {
            jobs = jobs.filter(job => job.salary === salary);
        }

        // Sorting
        if (sort) {
            if (sort === 'Date Posted') {
                jobs.sort((a, b) => a.postedDays - b.postedDays);
            } else if (sort === 'Salary: High to Low') {
                jobs.reverse();
            } else if (sort === 'Salary: Low to High') {
                // Default order
            }
        }

        // Calculate ATS Score if user has resume
        if (userResumeText) {
            jobs = jobs.map(job => ({
                ...job,
                atsScore: calculateATSScore(userResumeText, job)
            }));
        }

        res.json(jobs);
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};
