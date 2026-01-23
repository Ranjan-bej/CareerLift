const { PDFParse } = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

// Helper to read/write users
async function readUsersFile() {
    try {
        const txt = await fs.promises.readFile(USERS_FILE, 'utf8');
        return txt ? JSON.parse(txt) : [];
    } catch (err) { return []; }
}

async function writeUsersFile(users) {
    await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyCzcvUyqnN3VpFiT_UGb8Ieo8UODWA7jWI")

exports.analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('Starting resume analysis for file:', req.file.path);

        // 1. Extract Text
        let text = '';
        if (req.file.mimetype === 'application/pdf') {
            const fileBuffer = fs.readFileSync(req.file.path);
            const parser = new PDFParse({ data: fileBuffer });
            const result = await parser.getText();
            text = result.text;
        } else {
            // Fallback for non-PDFs (though frontend restricts to PDF/Docx, parsing docx needs other libs)
            // For now assume PDF or simple text extraction
            return res.status(400).json({ message: 'Only PDF files are currently supported for deep analysis.' });
        }

        // Truncate text if too long (Gemini has limits but they are high)
        text = text.slice(0, 30000);

        // 2. Generate Content with Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        You are an advanced Application Tracking System (ATS) and Career Coach. 
        Analyze the following resume text and provide a structured JSON response.
        Do not return any markdown formatting, just the raw JSON string.
        
        Resume Text:
        "${text.replace(/"/g, '\"')}"

        Required JSON Structure:
        {
            "score": <number 0-100 based on keyword density, formatting, impact>,
            "feedback": [
                { "type": "error", "text": "<Critical mistake, e.g. missing section>" },
                { "type": "warning", "text": "<Improvement suggestion, e.g. weak verbs>" },
                { "type": "success", "text": "<Positive point, e.g. good header>" }
            ],
            "apiSources": [
                { "name": "Gemini Analysis", "score": <same as score> },
                { "name": "Market Standard", "score": <score - 5> },
                { "name": "Recruiter Check", "score": <score + 2> }
            ],
            "suitableProfiles": [
                { "title": "<Job Title 1>", "matchPercentage": <number> },
                { "title": "<Job Title 2>", "matchPercentage": <number> }
            ]
        }
        Ensure the "feedback" array has at least 3-5 items mixed with success, error, and warning.
        Ensure "suitableProfiles" has 2-3 items.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // 3. Parse JSON
        // Clean up markdown code blocks if Gemini returns them
        const jsonString = textResponse.replace(/^```json/g, '').replace(/^```/g, '').replace(/```$/g, '').trim();
        const analysisData = JSON.parse(jsonString);

        res.json(analysisData);

    } catch (error) {
        console.error('Analysis error:', error);
        // Log to file for debugging
        fs.appendFileSync('backend_error.log', new Date().toISOString() + ': ' + error.stack + '\n');

        // Fallback or Error handling
        res.status(500).json({
            message: 'Error analyzing resume',
            error: error.message,
            hint: "Check server logs/backend_error.log for details."
        });
    } finally {
        // 4. Cleanup: Remove the file from uploads/
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
                else console.log('File deleted successfully:', req.file.path);
            });
        }
    }
};

exports.uploadResume = async (req, res) => {
    try {
        if (!req.file || !req.body.email) {
            return res.status(400).json({ message: 'File and email are required' });
        }

        const email = req.body.email;
        console.log(`Uploading resume for ${email}:`, req.file.path);

        // 1. Extract Text
        let text = '';
        if (req.file.mimetype === 'application/pdf') {
            const fileBuffer = fs.readFileSync(req.file.path);
            const parser = new PDFParse({ data: fileBuffer });
            const result = await parser.getText();
            text = result.text;
        } else {
            // Fallback for text/other
            text = fs.readFileSync(req.file.path, 'utf8');
        }

        // Clean text
        text = text.replace(/\s+/g, ' ').trim().slice(0, 30000);

        // 2. Update User Profile
        const users = await readUsersFile();
        const idx = users.findIndex(u => String(u.email) === String(email));

        const resumeData = {
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            uploadedAt: new Date().toISOString(),
            text: text
        };

        if (idx === -1) {
            // Create new user if not exists (though usually should exist)
            users.push({
                email,
                profile: {},
                contact: { email },
                resume: resumeData,
            });
        } else {
            users[idx].resume = resumeData;
        }

        await writeUsersFile(users);

        res.json({ message: 'Resume uploaded and saved successfully', resume: resumeData });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading resume', error: error.message });
    }
};
