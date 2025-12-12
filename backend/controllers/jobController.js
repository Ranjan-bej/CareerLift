const path = require('path');
const { readData } = require('../utils/fileHelper');

const DATA_DIR = path.join(__dirname, '../data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');

exports.getJobs = async (req, res) => {
    try {
        const { title, location, type, experience, salary, sort } = req.query;
        let jobs = await readData(JOBS_FILE);

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

        res.json(jobs);
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};
