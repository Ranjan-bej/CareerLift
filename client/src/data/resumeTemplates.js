// LaTeX Resume Templates - Diverse Professional Designs
export const resumeTemplates = [
    {
        id: 'executive',
        name: 'Executive',
        description: 'Elegant two-column design for senior professionals and executives',
        primaryColor: '#1a365d',
        previewImage: '/templates/executive-preview.png',
        latex: `%-------------------------
% Executive Resume Template
% Two-Column Professional Design
%-------------------------
\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage{fontawesome5}
\\usepackage{tikz}

% Page setup
\\geometry{left=0.5in, right=0.5in, top=0.5in, bottom=0.5in}
\\pagestyle{empty}

% Colors
\\definecolor{primary}{HTML}{1A365D}
\\definecolor{secondary}{HTML}{2C5282}
\\definecolor{accent}{HTML}{ED8936}
\\definecolor{dark}{HTML}{1A202C}
\\definecolor{medium}{HTML}{4A5568}
\\definecolor{light}{HTML}{718096}

% Section formatting
\\titleformat{\\section}{\\Large\\bfseries\\color{primary}}{}{0em}{\\uppercase}[\\vspace{-6pt}\\color{accent}\\rule{\\linewidth}{1pt}]
\\titlespacing*{\\section}{0pt}{16pt}{8pt}

\\begin{document}

% Header with colored bar
\\begin{tikzpicture}[remember picture, overlay]
\\fill[primary] (current page.north west) rectangle ([yshift=-2.5cm]current page.north east);
\\end{tikzpicture}

\\vspace{-1.5cm}
\\begin{center}
{\\fontsize{32}{38}\\selectfont\\bfseries\\color{white} JONATHAN MITCHELL}\\\\[6pt]
{\\large\\color{accent} Chief Technology Officer}\\\\[8pt]
{\\color{white}\\small
\\faEnvelope\\ jonathan.mitchell@email.com \\quad
\\faPhone\\ +1 (555) 234-5678 \\quad
\\faLinkedin\\ linkedin.com/in/jmitchell \\quad
\\faMapMarker\\ San Francisco, CA
}
\\end{center}

\\vspace{0.8cm}

% Executive Summary
\\section{Executive Summary}
{\\color{dark}Visionary technology executive with 15+ years of experience leading digital transformation initiatives at Fortune 500 companies. Proven track record of building world-class engineering teams, driving \\$500M+ revenue growth, and delivering innovative products that redefine market standards.}

\\vspace{4pt}

% Two column layout
\\begin{multicols}{2}

\\section{Core Competencies}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt]
\\item Strategic Technology Roadmapping
\\item Digital Transformation Leadership
\\item P\\&L Management (\\$200M+)
\\item Global Team Leadership (500+)
\\item Cloud Architecture
\\item AI/ML Strategy
\\end{itemize}

\\section{Career Highlights}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt]
\\item Led \\$2B digital transformation
\\item Scaled engineering from 50 to 500
\\item 40\\% reduction in infrastructure costs
\\item Launched 3 products with \\$100M+ ARR
\\end{itemize}

\\columnbreak

\\section{Professional Experience}

{\\large\\bfseries\\color{dark} Chief Technology Officer}\\\\
{\\color{secondary}\\textit{TechVision Inc.}}\\hfill{\\color{light}2019 -- Present}
\\begin{itemize}[leftmargin=*, nosep, itemsep=2pt, topsep=4pt]
\\item Architected multi-cloud strategy serving 50M users
\\item Built AI platform generating \\$150M annual revenue
\\item Established engineering centers in 4 countries
\\end{itemize}

\\vspace{8pt}

{\\large\\bfseries\\color{dark} VP of Engineering}\\\\
{\\color{secondary}\\textit{InnovateTech Corp.}}\\hfill{\\color{light}2015 -- 2019}
\\begin{itemize}[leftmargin=*, nosep, itemsep=2pt, topsep=4pt]
\\item Directed 200-person engineering organization
\\item Delivered enterprise platform ahead of schedule
\\item Reduced time-to-market by 60\\%
\\end{itemize}

\\section{Education}
{\\bfseries MBA, Technology Management}\\\\
Stanford Graduate School of Business\\\\[4pt]
{\\bfseries MS, Computer Science}\\\\
MIT

\\end{multicols}

\\end{document}
`
    },
    {
        id: 'tech-modern',
        name: 'Tech Modern',
        description: 'Clean sidebar design perfect for software engineers and developers',
        primaryColor: '#6366f1',
        previewImage: '/templates/tech-modern-preview.png',
        latex: `%-------------------------
% Tech Modern Resume Template
% Sidebar Layout for Developers
%-------------------------
\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{tikz}
\\usepackage{fontawesome5}
\\usepackage{hyperref}

% Page setup
\\geometry{left=0in, right=0in, top=0in, bottom=0in}
\\pagestyle{empty}

% Colors
\\definecolor{sidebar}{HTML}{1E1B4B}
\\definecolor{primary}{HTML}{6366F1}
\\definecolor{accent}{HTML}{A78BFA}
\\definecolor{dark}{HTML}{1F2937}
\\definecolor{medium}{HTML}{4B5563}
\\definecolor{light}{HTML}{9CA3AF}

\\begin{document}

\\noindent
\\begin{tikzpicture}[remember picture, overlay]
\\fill[sidebar] (current page.north west) rectangle ([xshift=6.5cm]current page.south west);
\\end{tikzpicture}

\\noindent
\\begin{minipage}[t]{6cm}
\\vspace{0.6cm}
\\hspace{0.4cm}
\\begin{minipage}{5.2cm}
\\raggedright

\\vspace{0.4cm}

{\\fontsize{20}{24}\\selectfont\\bfseries\\color{white} ALEX CHEN}\\\\[4pt]
{\\color{accent}\\large Full Stack Developer}

\\vspace{0.6cm}

{\\color{accent}\\faEnvelope}\\hspace{8pt}{\\color{white}\\small alex@devmail.com}\\\\[6pt]
{\\color{accent}\\faPhone}\\hspace{8pt}{\\color{white}\\small (555) 987-6543}\\\\[6pt]
{\\color{accent}\\faGithub}\\hspace{8pt}{\\color{white}\\small github.com/alexchen}\\\\[6pt]
{\\color{accent}\\faLinkedin}\\hspace{8pt}{\\color{white}\\small linkedin.com/in/alexchen}\\\\[6pt]
{\\color{accent}\\faMapMarker}\\hspace{8pt}{\\color{white}\\small Seattle, WA}

\\vspace{0.6cm}

{\\large\\bfseries\\color{accent} TECH STACK}\\\\[8pt]
{\\color{white}\\small
\\textbf{Frontend}\\\\
React, Next.js, TypeScript,\\\\
Tailwind CSS, Redux\\\\[6pt]
\\textbf{Backend}\\\\
Node.js, Python, Go,\\\\
GraphQL, REST APIs\\\\[6pt]
\\textbf{Database}\\\\
PostgreSQL, MongoDB,\\\\
Redis, Elasticsearch\\\\[6pt]
\\textbf{Cloud and DevOps}\\\\
AWS, Docker, Kubernetes,\\\\
CI/CD, Terraform
}

\\vspace{0.6cm}

{\\large\\bfseries\\color{accent} LANGUAGES}\\\\[8pt]
{\\color{white}\\small
English (Native)\\\\
Mandarin (Fluent)\\\\
Spanish (Conversational)
}

\\end{minipage}
\\end{minipage}%
\\hfill
\\begin{minipage}[t]{11.5cm}
\\vspace{0.6cm}
\\hspace{0.3cm}
\\begin{minipage}{10.5cm}

{\\Large\\bfseries\\color{primary} ABOUT ME}\\\\[2pt]
{\\color{primary}\\rule{3cm}{2pt}}\\\\[8pt]
{\\color{medium}Passionate full-stack developer with 6 years of experience building scalable web applications. I love solving complex problems and creating intuitive user experiences.}

\\vspace{0.5cm}

{\\Large\\bfseries\\color{primary} EXPERIENCE}\\\\[2pt]
{\\color{primary}\\rule{3cm}{2pt}}

\\vspace{0.4cm}

{\\large\\bfseries\\color{dark} Senior Software Engineer}\\\\
{\\color{primary}Stripe}\\hfill{\\color{light}2021 -- Present}
\\begin{itemize}[leftmargin=*, nosep, itemsep=2pt, topsep=4pt]
\\item Built payment processing microservices handling \\$1B+ daily
\\item Led migration to event-driven architecture, 40\\% latency reduction
\\item Mentored 5 engineers and established code review standards
\\end{itemize}

\\vspace{0.4cm}

{\\large\\bfseries\\color{dark} Software Engineer}\\\\
{\\color{primary}Airbnb}\\hfill{\\color{light}2019 -- 2021}
\\begin{itemize}[leftmargin=*, nosep, itemsep=2pt, topsep=4pt]
\\item Developed React components for booking flow (50M+ users)
\\item Implemented real-time pricing engine with WebSocket
\\item Reduced page load time by 35\\% through optimization
\\end{itemize}

\\vspace{0.4cm}

{\\large\\bfseries\\color{dark} Junior Developer}\\\\
{\\color{primary}Startup Labs}\\hfill{\\color{light}2018 -- 2019}
\\begin{itemize}[leftmargin=*, nosep, itemsep=2pt, topsep=4pt]
\\item Built MVP that secured \\$2M seed funding
\\item Implemented authentication and user management
\\end{itemize}

\\vspace{0.5cm}

{\\Large\\bfseries\\color{primary} EDUCATION}\\\\[2pt]
{\\color{primary}\\rule{3cm}{2pt}}

\\vspace{0.4cm}

{\\large\\bfseries\\color{dark} BS Computer Science}\\\\
{\\color{primary}University of Washington}\\hfill{\\color{light}2018}\\\\
{\\color{medium}GPA: 3.9/4.0 - Dean's List - ACM President}

\\end{minipage}
\\end{minipage}

\\end{document}
`
    },
    {
        id: 'academic',
        name: 'Academic CV',
        description: 'Comprehensive format for researchers, professors, and PhD candidates',
        primaryColor: '#7c3aed',
        previewImage: '/templates/academic-preview.png',
        latex: `%-------------------------
% Academic CV Template
% For Researchers and Professors
%-------------------------
\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{hyperref}

% Page setup
\\geometry{left=1in, right=1in, top=0.8in, bottom=0.8in}
\\pagestyle{empty}

% Colors
\\definecolor{primary}{HTML}{7C3AED}
\\definecolor{secondary}{HTML}{5B21B6}
\\definecolor{dark}{HTML}{1F2937}
\\definecolor{medium}{HTML}{4B5563}
\\definecolor{light}{HTML}{6B7280}

% Section formatting
\\titleformat{\\section}{\\Large\\bfseries\\scshape\\color{primary}}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{14pt}{8pt}
\\titleformat{\\subsection}{\\large\\bfseries\\color{dark}}{}{0em}{}
\\titlespacing*{\\subsection}{0pt}{10pt}{4pt}

\\begin{document}

\\begin{center}
{\\fontsize{28}{34}\\selectfont\\bfseries\\color{dark} Dr. Sarah Elizabeth Rodriguez}\\\\[8pt]
{\\large\\color{primary} Associate Professor of Computer Science}\\\\[6pt]
{\\color{medium}
\\faUniversity\\ Stanford University \\quad
\\faEnvelope\\ s.rodriguez@stanford.edu \\quad
\\faGlobe\\ stanford.edu/srodriguez
}\\\\[4pt]
{\\color{medium}
\\faPhone\\ (650) 123-4567 \\quad
ORCID: 0000-0002-1234-5678
}
\\end{center}

\\vspace{0.3cm}

\\section{Research Interests}
Machine Learning, Natural Language Processing, Computational Linguistics, Human-Computer Interaction, AI Ethics and Fairness in Large Language Models

\\section{Academic Appointments}
\\textbf{Associate Professor}\\hfill 2020 -- Present\\\\
Department of Computer Science, Stanford University\\\\[6pt]
\\textbf{Assistant Professor}\\hfill 2015 -- 2020\\\\
Department of Computer Science, Stanford University\\\\[6pt]
\\textbf{Postdoctoral Researcher}\\hfill 2013 -- 2015\\\\
MIT Computer Science and Artificial Intelligence Laboratory

\\section{Education}
\\textbf{Ph.D. in Computer Science}\\hfill 2013\\\\
Massachusetts Institute of Technology\\\\
\\textit{Dissertation: Neural Approaches to Semantic Understanding in Natural Language}\\\\
Advisor: Prof. James Thompson\\\\[6pt]
\\textbf{M.S. in Computer Science}\\hfill 2009\\\\
University of California, Berkeley\\\\[6pt]
\\textbf{B.S. in Computer Science, Summa Cum Laude}\\hfill 2007\\\\
California Institute of Technology

\\section{Selected Publications}
\\begin{enumerate}[leftmargin=*, nosep, itemsep=4pt]
\\item \\textbf{Rodriguez, S.}, Chen, W., Park, J. (2024). Fairness-Aware Language Models for Equitable AI. \\textit{Nature Machine Intelligence}, 6(2), 145-158.
\\item Johnson, M., \\textbf{Rodriguez, S.}, Lee, K. (2023). Scaling Laws for Multilingual Language Understanding. \\textit{Proceedings of NeurIPS 2023}. \\textbf{Best Paper Award}
\\item \\textbf{Rodriguez, S.}, Williams, A. (2022). Interpretable Neural Networks for Clinical NLP. \\textit{Journal of the ACM}, 69(4), 1-35.
\\item Chen, L., \\textbf{Rodriguez, S.}, et al. (2021). Zero-Shot Cross-Lingual Transfer with Minimal Resources. \\textit{Proceedings of ACL 2021}.
\\end{enumerate}

\\section{Grants and Funding}
\\textbf{NSF CAREER Award}\\hfill \\$750,000 \\quad 2018-2023\\\\
Advancing Fairness in Natural Language Processing Systems\\\\[6pt]
\\textbf{Google Research Award}\\hfill \\$150,000 \\quad 2022\\\\
Efficient Multilingual Language Model Pretraining\\\\[6pt]
\\textbf{NIH R01 Grant (Co-PI)}\\hfill \\$1,200,000 \\quad 2020-2025\\\\
AI-Powered Clinical Decision Support Systems

\\section{Teaching}
\\textbf{CS 224N: Natural Language Processing with Deep Learning}\\hfill 2016 -- Present\\\\
Graduate course, 200+ students per offering, Rating: 4.8/5.0\\\\[6pt]
\\textbf{CS 329: Machine Learning Systems Design}\\hfill 2020 -- Present\\\\
Graduate seminar, 40 students, Rating: 4.9/5.0

\\section{PhD Students Advised}
\\begin{itemize}[leftmargin=*, nosep, itemsep=2pt]
\\item Wei Chen (2024, now at OpenAI), Maria Garcia (2023, now Assistant Prof. at CMU)
\\item David Kim (2022, now at Google DeepMind), Lisa Park (current)
\\end{itemize}

\\section{Service}
\\textbf{Area Chair:} NeurIPS 2023, ACL 2022, EMNLP 2021\\\\
\\textbf{Editorial Board:} Journal of Machine Learning Research (2020-present)\\\\
\\textbf{Program Committee:} ICML, ICLR, AAAI, NAACL

\\end{document}
`
    },
    {
        id: 'creative-designer',
        name: 'Creative Designer',
        description: 'Bold, artistic layout for designers, artists, and creative professionals',
        primaryColor: '#ec4899',
        previewImage: '/templates/creative-preview.png',
        latex: `%-------------------------
% Creative Designer Resume
% Bold Artistic Layout
%-------------------------
\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{tikz}
\\usepackage{fontawesome5}

% Page setup
\\geometry{left=0.6in, right=0.6in, top=0.5in, bottom=0.5in}
\\pagestyle{empty}

% Colors
\\definecolor{primary}{HTML}{EC4899}
\\definecolor{secondary}{HTML}{F472B6}
\\definecolor{accent}{HTML}{FBBF24}
\\definecolor{dark}{HTML}{1F2937}
\\definecolor{medium}{HTML}{4B5563}
\\definecolor{light}{HTML}{9CA3AF}
\\definecolor{bg}{HTML}{FDF2F8}

% Custom section
\\titleformat{\\section}{\\fontsize{14}{16}\\selectfont\\bfseries\\color{primary}}{}{0em}{\\uppercase}
\\titlespacing*{\\section}{0pt}{16pt}{8pt}

\\begin{document}

% Decorative header background
\\begin{tikzpicture}[remember picture, overlay]
\\fill[primary] ([yshift=-4cm]current page.north west) -- (current page.north west) -- (current page.north east) -- ([yshift=-2cm]current page.north east) -- cycle;
\\fill[secondary, opacity=0.5] ([yshift=-4.5cm, xshift=5cm]current page.north west) circle (3cm);
\\fill[accent, opacity=0.3] ([yshift=-3cm, xshift=15cm]current page.north west) circle (2cm);
\\end{tikzpicture}

\\vspace{-1.5cm}
\\begin{center}
{\\fontsize{36}{42}\\selectfont\\bfseries\\color{white} MAYA JOHNSON}\\\\[8pt]
{\\Large\\color{white} Senior UX/UI Designer and Creative Director}
\\end{center}

\\vspace{1cm}

% Contact bar
\\begin{center}
\\colorbox{bg}{\\parbox{0.9\\textwidth}{
\\centering
\\vspace{4pt}
{\\color{primary}\\faEnvelope}\\ maya@design.studio \\quad
{\\color{primary}\\faPhone}\\ (555) 321-9876 \\quad
{\\color{primary}\\faGlobe}\\ mayajohnson.design \\quad
{\\color{primary}\\faDribbble}\\ dribbble.com/maya
\\vspace{4pt}
}}
\\end{center}

\\vspace{0.5cm}

% Quote/Tagline
\\begin{center}
{\\large\\itshape\\color{medium}Design is not just what it looks like. Design is how it works.}
\\end{center}

\\vspace{0.5cm}

\\section{\\faUser\\ About}
Award-winning designer with 8+ years crafting memorable digital experiences. I blend strategic thinking with artistic vision to create products that delight users and drive business results. My work has reached 100M+ users globally.

\\section{\\faPaintBrush\\ Featured Work}

\\begin{minipage}[t]{0.48\\textwidth}
{\\large\\bfseries\\color{dark} Nike Run Club Redesign}\\\\
{\\color{primary}Lead Designer}\\hfill{\\color{light}2023}\\\\
{\\color{medium}Complete app redesign resulting in 45\\% increase in daily active users.}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
{\\large\\bfseries\\color{dark} Spotify Wrapped}\\\\
{\\color{primary}Senior Visual Designer}\\hfill{\\color{light}2022}\\\\
{\\color{medium}Created visual system for annual campaign reaching 400M+ users.}
\\end{minipage}

\\vspace{0.5cm}

\\begin{minipage}[t]{0.48\\textwidth}
{\\large\\bfseries\\color{dark} Airbnb Experiences}\\\\
{\\color{primary}Product Designer}\\hfill{\\color{light}2021}\\\\
{\\color{medium}Designed booking flow, increasing conversion by 32\\%.}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
{\\large\\bfseries\\color{dark} Google Material You}\\\\
{\\color{primary}Contributing Designer}\\hfill{\\color{light}2021}\\\\
{\\color{medium}Contributed to design system adopted by 3B+ Android devices.}
\\end{minipage}

\\section{\\faBriefcase\\ Experience}

{\\large\\bfseries\\color{dark} Creative Director} | {\\color{primary}Design Studio NYC}\\hfill{\\color{light}2021 -- Present}\\\\
{\\color{medium}Leading 12-person design team for Fortune 500 clients. Grew studio revenue by 200\\%.}

\\vspace{8pt}

{\\large\\bfseries\\color{dark} Senior Product Designer} | {\\color{primary}Spotify}\\hfill{\\color{light}2019 -- 2021}\\\\
{\\color{medium}Core member of Consumer Experience team. Shipped features to 400M+ users.}

\\section{\\faTools\\ Skills and Tools}

\\begin{minipage}[t]{0.3\\textwidth}
{\\bfseries\\color{dark} Design}\\\\
{\\color{medium}UI/UX Design\\\\
Brand Identity\\\\
Motion Design\\\\
Design Systems}
\\end{minipage}
\\begin{minipage}[t]{0.3\\textwidth}
{\\bfseries\\color{dark} Tools}\\\\
{\\color{medium}Figma (Expert)\\\\
After Effects\\\\
Principle, Framer\\\\
Adobe Creative Suite}
\\end{minipage}
\\begin{minipage}[t]{0.3\\textwidth}
{\\bfseries\\color{dark} Soft Skills}\\\\
{\\color{medium}Team Leadership\\\\
Client Presentation\\\\
Design Thinking\\\\
Cross-functional Collab}
\\end{minipage}

\\section{\\faGraduationCap\\ Education and Awards}
\\textbf{BFA in Graphic Design} -- Rhode Island School of Design\\hfill 2016\\\\
{\\color{primary}\\faTrophy}\\ Awwwards Site of the Year (2023) \\quad
{\\color{primary}\\faTrophy}\\ Red Dot Design Award (2022)

\\end{document}
`
    },
    {
        id: 'data-scientist',
        name: 'Data Scientist',
        description: 'Technical layout optimized for data science and ML engineering roles',
        primaryColor: '#0891b2',
        previewImage: '/templates/data-scientist-preview.png',
        latex: `%-------------------------
% Data Scientist Resume Template
% Technical Focus Layout
%-------------------------
\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{tikz}
\\usepackage{hyperref}
\\usepackage{tabularx}

% Page setup
\\geometry{left=0.7in, right=0.7in, top=0.6in, bottom=0.6in}
\\pagestyle{empty}

% Colors
\\definecolor{primary}{HTML}{0891B2}
\\definecolor{secondary}{HTML}{06B6D4}
\\definecolor{accent}{HTML}{F97316}
\\definecolor{dark}{HTML}{0F172A}
\\definecolor{medium}{HTML}{475569}
\\definecolor{light}{HTML}{64748B}
\\definecolor{skillbg}{HTML}{E0F2FE}

% Section formatting
\\titleformat{\\section}{\\large\\bfseries\\color{primary}}{}{0em}{}[\\color{secondary}\\rule{\\linewidth}{0.5pt}]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

\\begin{document}

% Header
\\begin{center}
{\\fontsize{26}{32}\\selectfont\\bfseries\\color{dark} DAVID KUMAR}\\\\[6pt]
{\\large\\color{primary} Senior Data Scientist | ML Engineer}\\\\[8pt]
{\\color{medium}
\\faEnvelope\\ david.kumar@email.com \\quad
\\faPhone\\ (555) 456-7890 \\quad
\\faGithub\\ github.com/dkumar \\quad
\\faLinkedin\\ linkedin.com/in/davidkumar
}
\\end{center}

\\vspace{0.3cm}

% Summary
\\section{Summary}
Data scientist with 7+ years of experience in machine learning, statistical modeling, and big data analytics. Specialized in NLP and computer vision applications at scale. Published researcher with 12+ papers and 3,000+ citations.

% Skills Section with visual bars
\\section{Technical Skills}

\\begin{tabularx}{\\textwidth}{X X X}
\\textbf{\\color{dark}Machine Learning} \\newline PyTorch, TensorFlow, Keras, Scikit-learn, XGBoost, Hugging Face, Computer Vision, NLP &
\\textbf{\\color{dark}Programming} \\newline Python, R, SQL, Scala, NumPy, Pandas, Git, Docker, MLflow, FastAPI &
\\textbf{\\color{dark}Big Data and Cloud} \\newline AWS SageMaker, Spark, Databricks, GCP Vertex AI, BigQuery, Airflow, Kubeflow \\\\
\\end{tabularx}

\\section{Professional Experience}

{\\large\\bfseries\\color{dark} Senior Data Scientist}\\hfill{\\color{light}Jan 2021 -- Present}\\\\
{\\color{primary}\\textbf{OpenAI}}\\hfill{\\color{light}San Francisco, CA}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt, topsep=4pt]
\\item Developed fine-tuning pipeline for GPT models, improving task-specific performance by 40\\%
\\item Built evaluation framework for LLM safety, processing 10M+ interactions daily
\\item Led team of 4 scientists on multimodal learning research
\\item Created internal ML platform reducing model deployment time from weeks to hours
\\end{itemize}

\\vspace{8pt}

{\\large\\bfseries\\color{dark} Data Scientist II}\\hfill{\\color{light}Jun 2018 -- Dec 2020}\\\\
{\\color{primary}\\textbf{Netflix}}\\hfill{\\color{light}Los Gatos, CA}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt, topsep=4pt]
\\item Built recommendation models serving 200M+ subscribers globally
\\item Developed A/B testing framework for content personalization experiments
\\item Reduced video encoding costs by \\$50M/year through ML-based quality optimization
\\item Published 3 papers on multi-task learning at RecSys and KDD
\\end{itemize}

\\vspace{8pt}

{\\large\\bfseries\\color{dark} Data Scientist}\\hfill{\\color{light}Aug 2016 -- May 2018}\\\\
{\\color{primary}\\textbf{Uber}}\\hfill{\\color{light}San Francisco, CA}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt, topsep=4pt]
\\item Created surge pricing prediction model improving driver allocation by 25\\%
\\item Built fraud detection system preventing \\$100M+ in fraudulent transactions
\\item Designed experimentation platform for marketplace optimization
\\end{itemize}

\\section{Selected Publications}

\\begin{enumerate}[leftmargin=*, nosep, itemsep=3pt]
\\item \\textbf{Kumar, D.}, et al. Efficient Fine-tuning of Large Language Models. \\textit{NeurIPS 2023}
\\item \\textbf{Kumar, D.}, Smith, J. Multi-Task Learning for Recommendation Systems. \\textit{KDD 2020}
\\item Chen, L., \\textbf{Kumar, D.} Scalable Video Quality Assessment with Deep Learning. \\textit{CVPR 2019}
\\end{enumerate}

\\section{Education}

{\\bfseries\\color{dark} Ph.D. in Computer Science}\\hfill{\\color{light}2016}\\\\
Stanford University -- Focus: Machine Learning and NLP, Advisor: Prof. Andrew Ng\\\\[4pt]
{\\bfseries\\color{dark} B.S. in Computer Science and Mathematics}\\hfill{\\color{light}2011}\\\\
UC Berkeley -- Summa Cum Laude, GPA: 3.95/4.0

\\section{Certifications and Awards}
\\faAward\\ Google Cloud Professional ML Engineer |
\\faAward\\ AWS ML Specialty |
\\faAward\\ Kaggle Competitions Master (Top 0.1\\%)

\\end{document}
`
    },
    {
        id: 'minimalist-elegant',
        name: 'Minimalist Elegant',
        description: 'Clean, white-space focused design for any professional field',
        primaryColor: '#374151',
        previewImage: '/templates/minimalist-preview.png',
        latex: `%-------------------------
% Minimalist Elegant Resume
% Clean Professional Design
%-------------------------
\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}

% Page setup - generous margins
\\geometry{left=1.2in, right=1.2in, top=1in, bottom=1in}
\\pagestyle{empty}

% Colors - subtle palette
\\definecolor{dark}{HTML}{111827}
\\definecolor{medium}{HTML}{374151}
\\definecolor{light}{HTML}{6B7280}
\\definecolor{accent}{HTML}{9CA3AF}

% Minimal section formatting
\\titleformat{\\section}{\\normalfont\\large\\color{dark}}{}{0em}{}[\\vspace{-8pt}\\color{accent}\\rule{2cm}{0.5pt}]
\\titlespacing*{\\section}{0pt}{20pt}{10pt}

% Hyperlinks
\\hypersetup{colorlinks=true, linkcolor=dark, urlcolor=dark}

\\begin{document}

\\begin{center}
{\\fontsize{24}{30}\\selectfont\\color{dark} EMMA WILLIAMS}\\\\[12pt]
{\\color{light}Product Manager -- San Francisco}\\\\[8pt]
{\\color{medium}\\small
emma@email.com -- (555) 234-5678 -- linkedin.com/in/emmaw
}
\\end{center}

\\vspace{0.4cm}

\\section{About}
{\\color{medium}
Strategic product leader with a track record of launching products used by millions. I thrive at the intersection of business strategy, user experience, and technology. Currently focused on AI-powered productivity tools.
}

\\section{Experience}

{\\color{dark}\\textbf{Director of Product}}\\hfill{\\color{light}2022 -- Present}\\\\
{\\color{medium}Notion}\\\\[4pt]
{\\color{light}\\small
Led the AI features initiative, growing MAU from 20M to 35M. Managed team of 8 PMs across core product. Drove \\$50M ARR growth through strategic feature development.
}

\\vspace{14pt}

{\\color{dark}\\textbf{Senior Product Manager}}\\hfill{\\color{light}2019 -- 2022}\\\\
{\\color{medium}Slack}\\\\[4pt]
{\\color{light}\\small
Owned the enterprise collaboration roadmap. Shipped Slack Connect, growing enterprise revenue by 40\\%. Conducted 200+ user interviews and translated insights into successful products.
}

\\vspace{14pt}

{\\color{dark}\\textbf{Product Manager}}\\hfill{\\color{light}2017 -- 2019}\\\\
{\\color{medium}Google}\\\\[4pt]
{\\color{light}\\small
Launched key features for Google Workspace reaching 2B+ users. Improved document collaboration NPS by 15 points. Led cross-functional team of 20 engineers and designers.
}

\\section{Education}

{\\color{dark}\\textbf{MBA}}\\hfill{\\color{light}2017}\\\\
{\\color{medium}Harvard Business School}\\\\[10pt]
{\\color{dark}\\textbf{BS, Computer Science}}\\hfill{\\color{light}2013}\\\\
{\\color{medium}Stanford University}

\\section{Skills}

{\\color{medium}
\\textbf{Product:} Strategy, Roadmapping, A/B Testing, Analytics, User Research\\\\[4pt]
\\textbf{Technical:} SQL, Python, Figma, JIRA, Amplitude, Mixpanel\\\\[4pt]
\\textbf{Leadership:} Team Building, Stakeholder Management, Executive Communication
}

\\section{Side Projects}

{\\color{dark}\\textbf{The PM Interview}}\\hfill{\\color{light}50k+ subscribers}\\\\
{\\color{medium}Weekly newsletter on product management career advice}\\\\[10pt]
{\\color{dark}\\textbf{Angel Investor}}\\hfill{\\color{light}12 investments}\\\\
{\\color{medium}Focus on early-stage B2B SaaS and developer tools}

\\end{document}
`
    },
    {
        id: 'consulting',
        name: 'Consulting Pro',
        description: 'Traditional format for management consulting and finance professionals',
        primaryColor: '#1e3a5f',
        previewImage: '/templates/consulting-preview.png',
        latex: `%-------------------------
% Consulting Pro Resume
% Traditional Business Format
%-------------------------
\\documentclass[11pt,letterpaper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}

% Page setup
\\geometry{left=0.75in, right=0.75in, top=0.6in, bottom=0.6in}
\\pagestyle{empty}

% Colors
\\definecolor{primary}{HTML}{1E3A5F}
\\definecolor{dark}{HTML}{1F2937}
\\definecolor{medium}{HTML}{4B5563}
\\definecolor{light}{HTML}{6B7280}

% Section formatting
\\titleformat{\\section}{\\normalsize\\bfseries\\scshape\\color{primary}}{}{0em}{\\uppercase}[\\vspace{-4pt}\\rule{\\linewidth}{0.8pt}]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

\\begin{document}

% Header
\\begin{center}
{\\fontsize{18}{22}\\selectfont\\bfseries\\scshape MICHAEL ALEXANDER THORNTON}\\\\[6pt]
{\\color{medium}
(617) 555-8901 -- michael.thornton@email.com -- linkedin.com/in/matthornton -- Boston, MA
}
\\end{center}

\\section{Education}

\\textbf{Harvard Business School}, Boston, MA\\hfill May 2020\\\\
Master of Business Administration\\\\
\\textit{\\small Baker Scholar (Top 5\\%), Finance Club Co-President, Case Competition Winner}\\\\[6pt]
\\textbf{Princeton University}, Princeton, NJ\\hfill May 2016\\\\
Bachelor of Arts in Economics, Summa Cum Laude\\\\
\\textit{\\small Phi Beta Kappa, Varsity Tennis, Senior Thesis Award}

\\section{Professional Experience}

\\textbf{McKinsey and Company}, Boston, MA\\\\
\\textit{Engagement Manager}\\hfill Jul 2020 -- Present
\\begin{itemize}[leftmargin=0.2in, nosep, itemsep=3pt, topsep=4pt]
\\item Lead 5-8 person teams on strategic transformations for Fortune 100 clients across healthcare, technology, and financial services sectors
\\item Developed go-to-market strategy for \\$2B pharmaceutical launch, resulting in 40\\% above-forecast first-year sales
\\item Designed post-merger integration roadmap for \\$15B technology acquisition, identifying \\$400M in synergies
\\item Built proprietary analytics model for customer segmentation, adopted firm-wide across 50+ engagements
\\item Mentor 12 Business Analysts; recognized as Exceptional People Developer three consecutive years
\\end{itemize}

\\vspace{6pt}

\\textbf{Goldman Sachs}, New York, NY\\\\
\\textit{Investment Banking Associate -- Technology, Media and Telecom}\\hfill Jun 2016 -- Jun 2018
\\begin{itemize}[leftmargin=0.2in, nosep, itemsep=3pt, topsep=4pt]
\\item Executed \\$8B+ in M and A and capital markets transactions for technology clients
\\item Led financial modeling and due diligence for \\$3.2B software acquisition
\\item Managed IPO process for enterprise SaaS company, raising \\$450M
\\item Promoted to Associate after 18 months (vs. typical 24-month timeline)
\\end{itemize}

\\vspace{6pt}

\\textbf{Bain and Company}, Boston, MA\\\\
\\textit{Summer Associate}\\hfill Summer 2019
\\begin{itemize}[leftmargin=0.2in, nosep, itemsep=3pt, topsep=4pt]
\\item Developed pricing strategy for consumer goods client, projecting \\$75M incremental EBITDA
\\item Received return offer with top performance rating
\\end{itemize}

\\section{Leadership and Activities}

\\textbf{Board Member}, Boston Youth Business Initiative\\hfill 2021 -- Present\\\\
\\textit{\\small Pro-bono strategic advisor for nonprofit supporting 500+ underprivileged entrepreneurs annually}\\\\[4pt]
\\textbf{Volunteer Consultant}, Doctors Without Borders\\hfill 2020 -- Present\\\\
\\textit{\\small Led operational efficiency project reducing patient wait times by 35\\% across 12 clinics}

\\section{Additional Information}

\\textbf{Skills:} Financial Modeling, Valuation, Strategic Planning, Team Leadership, Executive Communication\\\\
\\textbf{Technical:} Excel (Expert), PowerPoint, Tableau, SQL, Python\\\\
\\textbf{Languages:} English (Native), Spanish (Professional), Mandarin (Conversational)\\\\
\\textbf{Interests:} Marathon Running (Boston 2023 Finisher), Chess (USCF 1800), Classical Piano

\\end{document}
`
    },
    {
        id: 'startup-founder',
        name: 'Startup Founder',
        description: 'Dynamic layout for entrepreneurs and startup professionals',
        primaryColor: '#059669',
        previewImage: '/templates/startup-preview.png',
        latex: `%-------------------------
% Startup Founder Resume
% Dynamic Entrepreneurial Layout
%-------------------------
\\documentclass[11pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{tikz}

% Page setup
\\geometry{left=0.7in, right=0.7in, top=0.6in, bottom=0.6in}
\\pagestyle{empty}

% Colors
\\definecolor{primary}{HTML}{059669}
\\definecolor{secondary}{HTML}{10B981}
\\definecolor{accent}{HTML}{F59E0B}
\\definecolor{dark}{HTML}{111827}
\\definecolor{medium}{HTML}{374151}
\\definecolor{light}{HTML}{6B7280}

% Section formatting
\\titleformat{\\section}{\\Large\\bfseries\\color{primary}}{}{0em}{}
\\titlespacing*{\\section}{0pt}{16pt}{8pt}

\\begin{document}

% Header
\\begin{center}
{\\fontsize{32}{38}\\selectfont\\bfseries\\color{dark} RACHEL MARTINEZ}\\\\[8pt]
{\\large\\color{primary} Serial Entrepreneur | Tech Founder | Investor}\\\\[10pt]
{\\color{medium}
\\faEnvelope\\ rachel@venturemail.com \\quad
\\faTwitter\\ @rachelmartinez \\quad
\\faLinkedin\\ linkedin.com/in/rmartinez \\quad
\\faGlobe\\ rachelmartinez.com
}
\\end{center}

\\vspace{0.4cm}

% Metrics bar
\\begin{center}
\\begin{tikzpicture}
\\fill[primary!10, rounded corners=8pt] (0,0) rectangle (16,1.2);
\\node at (2.5,0.6) {\\color{primary}\\textbf{\\$85M+} {\\footnotesize\\color{medium}Raised}};
\\node at (6,0.6) {\\color{primary}\\textbf{3} {\\footnotesize\\color{medium}Exits}};
\\node at (9.5,0.6) {\\color{primary}\\textbf{500+} {\\footnotesize\\color{medium}Jobs Created}};
\\node at (13.5,0.6) {\\color{primary}\\textbf{10M+} {\\footnotesize\\color{medium}Users}};
\\end{tikzpicture}
\\end{center}

\\vspace{0.3cm}

\\section{\\faRocket\\ About}
{\\color{medium}
Three-time founder with exits to Google and Salesforce. I build products that make work more human. Currently scaling my third venture while advising early-stage founders. Forbes 30 Under 30, Y Combinator alum.
}

\\section{\\faBuilding\\ Ventures}

{\\large\\bfseries\\color{dark} Flowstate} {\\color{primary}| Founder and CEO}\\hfill{\\color{light}2021 -- Present}\\\\
{\\color{secondary}\\textit{AI-powered productivity platform for hybrid teams}}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt, topsep=4pt]
\\item Raised \\$32M Series B from a16z, Sequoia at \\$180M valuation
\\item Scaled to 2M+ users and \\$15M ARR in 18 months
\\item Building team of 85 across SF, NYC, and remote
\\item Product featured in TechCrunch, WSJ, and Product Hunt No.1
\\end{itemize}

\\vspace{10pt}

{\\large\\bfseries\\color{dark} TaskHero} {\\color{primary}| Co-Founder and CTO}\\hfill{\\color{light}2018 -- 2021}\\\\
{\\color{secondary}\\textit{Task automation for small businesses -- Acquired by Salesforce}}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt, topsep=4pt]
\\item Built from 0 to 500K users and \\$8M ARR
\\item Led engineering team of 25; architected core platform
\\item {\\color{accent}Acquired for \\$45M} by Salesforce (2021)
\\end{itemize}

\\vspace{10pt}

{\\large\\bfseries\\color{dark} StudyBuddy} {\\color{primary}| Founder}\\hfill{\\color{light}2015 -- 2018}\\\\
{\\color{secondary}\\textit{Peer tutoring marketplace for college students -- Acquired by Chegg}}
\\begin{itemize}[leftmargin=*, nosep, itemsep=3pt, topsep=4pt]
\\item Started in dorm room, grew to 200K students across 50 campuses
\\item Y Combinator W16 batch
\\item {\\color{accent}Acquired for \\$12M} by Chegg (2018)
\\end{itemize}

\\section{\\faHandshake\\ Investing and Advising}

{\\color{medium}
\\textbf{Angel Investor} -- 25+ investments including Notion (seed), Linear, Loom\\\\
\\textbf{Advisor} -- Stripe Atlas, On Deck, YC Office Hours volunteer\\\\
\\textbf{LP} -- Initialized Capital, First Round Capital
}

\\section{\\faGraduationCap\\ Background}

\\begin{minipage}[t]{0.48\\textwidth}
{\\bfseries\\color{dark} Stanford University}\\\\
{\\color{medium}BS Computer Science, 2015\\\\
Dropped out of MS to start StudyBuddy}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
{\\bfseries\\color{dark} Recognition}\\\\
{\\color{medium}Forbes 30 Under 30 (2020)\\\\
Inc. Female Founders 100 (2022)}
\\end{minipage}

\\section{\\faComments\\ In The Press}

{\\color{light}\\textit{Rachel is one of the most impressive founders I have backed.}} -- \\textbf{Marc Andreessen}\\\\
{\\color{light}\\textit{A rare combination of technical depth and business acumen.}} -- \\textbf{TechCrunch}

\\end{document}
`
    }
];

export const defaultLatex = resumeTemplates[0].latex;
