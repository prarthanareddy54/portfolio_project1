/**
 * Resume Data Source of Truth for Prarthana Reddy
 * Extracted directly from resume PDF
 */

export const resumeData = {
  personal: {
    name: 'PRARTHANA REDDY',
    title: 'AI/ML Developer & Full-Stack Web Developer',
    roleTagline: 'BCA Graduate | NLP Specialist | Predictive Analytics & Web Systems',
    location: 'Gangavathi, Karnataka, India',
    phone: '+91 9482164328',
    email: 'prarthanareddy54@gmail.com',
    linkedin: {
      url: 'https://linkedin.com/in/prarthana-reddy-02a602377/',
      display: 'linkedin.com/in/prarthana-reddy-02a602377/',
    },
    github: {
      url: 'https://github.com/prarthanareddy54',
      display: 'github.com/prarthanareddy54',
    },
    summary:
      'Motivated Bachelor of Computer Applications (BCA) graduate with a solid foundation in Artificial Intelligence, Machine Learning, and Web Development. Passionate about solving complex data problems and building scalable software solutions. Hands-on experience developing custom NLP models and predictive analytics pipelines using Python. Eager to leverage technical skills and algorithmic thinking in an entry-level AI/ML Developer role.',
    extendedBio: [
      'As a software technologist graduating in 2026, my approach blends deep theoretical foundations in machine learning with modern, high-performance web engineering.',
      'I specialize in turning raw, unstructured data into actionable intelligence—from designing tokenization pipelines for custom NLP models to engineering classification workflows with 90%+ prediction accuracy.',
      'My core philosophy rests on three pillars: Algorithmic Precision, Resilient Data Pipelines, and Clean, Human-Centric Interfaces.',
    ],
    philosophies: [
      {
        title: 'Algorithmic Precision',
        desc: 'Writing optimized, clean code that values computational efficiency and mathematical soundness.',
      },
      {
        title: 'End-to-End Scalability',
        desc: 'Bridging the gap between standalone ML models and production-ready web APIs with robust backend architectures.',
      },
      {
        title: 'User-Centric Architecture',
        desc: 'Creating lightning-fast web interfaces (sub-1.2s load times) that make complex data accessible and intuitive.',
      },
    ],
  },

  skills: [
    {
      category: 'Programming Languages',
      icon: 'Code',
      description: 'Core languages utilized for software logic, scripting, and web interfaces.',
      items: [
        { name: 'Python', level: 'Advanced', highlight: true, tags: ['NLP', 'ML', 'ETL', 'Algorithms'] },
        { name: 'JavaScript', level: 'Proficient', highlight: true, tags: ['ES6+', 'Async/Await', 'React', 'Node.js'] },
        { name: 'HTML5', level: 'Expert', highlight: false, tags: ['Semantic Web', 'Accessibility', 'SEO'] },
        { name: 'CSS3', level: 'Expert', highlight: false, tags: ['Responsive Design', 'Flexbox', 'Grid', 'Animations'] },
      ],
    },
    {
      category: 'AI/ML & Data Science',
      icon: 'Brain',
      description: 'Model building, text intelligence, mathematical evaluation, and data transformations.',
      items: [
        { name: 'Machine Learning', level: 'Advanced', highlight: true, tags: ['Supervised', 'Classification', 'Regression'] },
        { name: 'Natural Language Processing (NLP)', level: 'Advanced', highlight: true, tags: ['Tokenization', 'Text Normalization', 'Semantic Matching'] },
        { name: 'Scikit-Learn', level: 'Advanced', highlight: true, tags: ['Model Pipelines', 'Feature Engineering', 'Hyperparameter Tuning'] },
        { name: 'Predictive Modeling', level: 'Proficient', highlight: false, tags: ['Time-Series', 'Classification Accuracy (92%)'] },
      ],
    },
    {
      category: 'Web Development & Full-Stack',
      icon: 'Layers',
      description: 'Modern frontend design principles, server-side APIs, and database connectivity.',
      items: [
        { name: 'Frontend Development', level: 'Expert', highlight: true, tags: ['React.js', 'State Management', 'Component Architecture'] },
        { name: 'Node.js & Express.js', level: 'Proficient', highlight: true, tags: ['REST APIs', 'Middleware', 'CORS & Helmet'] },
        { name: 'Supabase & PostgreSQL', level: 'Proficient', highlight: true, tags: ['Postgres SQL', 'RLS Policies', 'Async Queries'] },
        { name: 'Responsive Web Design', level: 'Expert', highlight: false, tags: ['Mobile-First', 'Cross-Browser Compatibility'] },
        { name: 'UI/UX Principles', level: 'Proficient', highlight: false, tags: ['Visual Hierarchy', 'Typography', 'Micro-interactions'] },
        { name: 'Performance Optimization', level: 'Advanced', highlight: true, tags: ['Sub-1.2s Load Time', '98/100 Lighthouse'] },
      ],
    },
    {
      category: 'Developer Tools & Platforms',
      icon: 'Terminal',
      description: 'Version control, deployment workflows, and development environments.',
      items: [
        { name: 'Git', level: 'Advanced', highlight: false, tags: ['Branching', 'Version History', 'Rebasing'] },
        { name: 'GitHub', level: 'Advanced', highlight: false, tags: ['CI/CD', 'Open Source', 'Collaboration'] },
        { name: 'VS Code', level: 'Expert', highlight: false, tags: ['Extensions', 'Debugging', 'Live Server'] },
      ],
    },
  ],

  projects: [
    {
      id: 'custom-grok-nlp-model',
      title: 'Custom Grok-Inspired AI NLP Model',
      tagline: 'Custom Python Language Processing Model for Context Retrieval',
      category: 'AI / Machine Learning',
      featured: true,
      badge: 'NLP Architecture',
      techStack: ['Python', 'NLP', 'Tokenization', 'Text Normalization', 'Semantic Evaluation', 'Regex'],
      highlights: [
        'Engineered a custom AI language processing model in Python using advanced NLP techniques to optimize context retrieval and query execution.',
        'Implemented tokenization, text normalization, and semantic evaluation pipelines to process 10,000+ text data points efficiently.',
        'Improved response relevance and accurate keyword match rates by 28% through fine-tuning hyperparameters.',
      ],
      metrics: [
        { label: 'Data Points Processed', value: '10,000+' },
        { label: 'Keyword Match Accuracy Boost', value: '+28%' },
        { label: 'Primary Language', value: 'Python' },
      ],
      githubUrl: 'https://github.com/prarthanareddy54',
      liveDemoUrl: '#',
    },
    {
      id: 'ml-predictive-analytics-pipeline',
      title: 'ML Predictive Analytics Pipeline',
      tagline: 'End-to-End Machine Learning Classification & Automated ETL Pipeline',
      category: 'Data Science & ML',
      featured: true,
      badge: '92% Accuracy',
      techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'ETL Pipelines', 'Feature Engineering'],
      highlights: [
        'Developed an end-to-end machine learning pipeline using Python and Scikit-Learn to process, clean, and model complex datasets.',
        'Executed feature engineering and applied classification algorithms, achieving an overall prediction accuracy rate of 92%.',
        'Reduced data preprocessing overhead by 35% through automated ETL scripting and dynamic pipeline architecture.',
      ],
      metrics: [
        { label: 'Prediction Accuracy', value: '92%' },
        { label: 'ETL Overhead Reduction', value: '-35%' },
        { label: 'Model Stack', value: 'Scikit-Learn' },
      ],
      githubUrl: 'https://github.com/prarthanareddy54',
      liveDemoUrl: '#',
    },
    {
      id: 'interactive-uiux-portfolio',
      title: 'Interactive UI/UX Portfolio Website',
      tagline: 'High-Performance, Sub-1.2s Load Time Portfolio & Full-Stack System',
      category: 'Web Development',
      featured: true,
      badge: '98/100 Lighthouse',
      techStack: ['React.js', 'Node.js', 'Express.js', 'Supabase', 'PostgreSQL', 'HTML5/CSS3'],
      highlights: [
        'Designed and built a responsive static portfolio website utilizing HTML5, CSS3, and JavaScript to showcase software projects and technical achievements.',
        'Applied modern UI/UX principles, cross-browser compatibility testing, and mobile-first responsive design standards.',
        'Optimized web assets and script execution to achieve a sub-1.2 second page load time and a 98/100 Google Lighthouse performance score.',
      ],
      metrics: [
        { label: 'Lighthouse Score', value: '98 / 100' },
        { label: 'Page Load Time', value: '< 1.2s' },
        { label: 'Architecture', value: 'React + Express' },
      ],
      githubUrl: 'https://github.com/prarthanareddy54',
      liveDemoUrl: '#',
    },
  ],

  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'KLE College, Gangavathi',
      graduationYear: 'Graduation Year: 2026',
      status: 'Final Year / Graduating 2026',
      details: [
        'Rigorous coursework in Data Structures, Algorithms, Database Management Systems (DBMS), and Object-Oriented Programming.',
        'Specialized academic focus on Artificial Intelligence, Machine Learning methodologies, and Full-Stack Web Development.',
        'Hands-on laboratory research in Python data science environments and relational database architecture.',
      ],
    },
  ],

  certifications: [
    {
      title: 'Machine Learning & Frontend Development Certificate',
      issuer: 'Professional Industry Certification',
      year: '2025',
      topics: ['Supervised Learning', 'Model Evaluation', 'Component Architecture', 'Modern JS'],
    },
    {
      title: 'Generative AI (GenAI) Fundamentals',
      issuer: 'AI Certification Program',
      year: '2025',
      topics: ['Large Language Models', 'Prompt Engineering', 'NLP Foundations', 'Contextual Embeddings'],
    },
    {
      title: 'Professional UI/UX Design Certificate',
      issuer: 'Design Standards Academy',
      year: '2024',
      topics: ['User Flows', 'Responsive Layouts', 'Design Systems', 'Micro-Interactions'],
    },
  ],
};
