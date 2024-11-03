import {ContentData, Challenge, MentorshipFeature, ResourcesInterface} from "@/abstract/interface";
import {
    FaCode,
    FaTools,
    FaCubes,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaChartLine,
    FaMobileAlt,
    FaCodeBranch,
    FaTachometerAlt,
    FaNewspaper,
    FaBook,
    FaToolbox,
    FaUserTie,
} from "react-icons/fa";
import {FaBriefcase, FaGithub, FaRocket, FaUsers} from "react-icons/fa6";

export const contentData: ContentData = {
    explore: {
        title: "Explore Our Content",
        sections: {
            Cheat_Sheets: {
                description:
                    "Handy references for programming languages, tools, and frameworks.",
                items: {
                    color: "#FFC107",
                    title: "Codepen",
                    descr: "An online code editor and learning environment.",
                    contents: [
                        {
                            icon: FaCode,
                            title: "Programming Languages",
                            data: "Python, JavaScript, Java, C++, and more.",
                        },
                        {
                            icon: FaTools,
                            title: "Development Tools",
                            data: "Git, Docker, VS Code, etc.",
                        },
                        {
                            icon: FaCubes,
                            title: "Frameworks and Libraries",
                            data: "React, Angular, Django, and more.",
                        },
                        {
                            icon: FaCss3Alt,
                            title: "Frontend Development",
                            data: "HTML, CSS, JavaScript, and more.",
                        },
                    ],
                },
            },
            Tutorials: {
                description:
                    "Guides for learning new skills and building projects, for all levels.",
                items: {
                    color: "#FF5722",
                    title: "Codecademy",
                    descr: "Interactive coding tutorials and courses.",
                    contents: [
                        {
                            icon: FaHtml5,
                            title: "Web Development",
                            data: "HTML, CSS, JavaScript, and more.",
                        },
                        {
                            icon: FaChartLine,
                            title: "Data Science",
                            data: "Python, SQL, Pandas, and more.",
                        },
                        {
                            icon: FaMobileAlt,
                            title: "App Development",
                            data: "React Native, Swift, Kotlin, and more.",
                        },
                        {
                            icon: FaJs,
                            title: "JavaScript",
                            data: "ES6, Node.js, React, and more.",
                        },
                    ],
                },
            },
            Articles: {
                description:
                    "In-depth articles on various computer science topics and industry trends.",
                items: {
                    color: "#03A9F4",
                    title: "Medium",
                    descr: "Publishing platform for articles.",
                    contents: [
                        {
                            icon: FaCodeBranch,
                            title: "Coding Best Practices",
                            data: "Improve coding habits and write cleaner code.",
                        },
                        {
                            icon: FaTachometerAlt,
                            title: "Optimization Techniques",
                            data: "Make your code faster and more efficient.",
                        },
                        {
                            icon: FaNewspaper,
                            title: "Industry Insights",
                            data: "Interviews with professionals and the latest tech trends.",
                        },
                        {
                            icon: FaCode,
                            title: "Algorithms and Data Structures",
                            data: "Learn and practice algorithms and data structures.",
                        },
                    ],
                },
            },
            Resources: {
                description:
                    "Curated lists of books, courses, tools, and websites to aid learning and career growth.",
                items: {
                    color: "#4CAF50",
                    title: "GitHub",
                    descr: "Repository hosting service.",
                    contents: [
                        {
                            icon: FaBook,
                            title: "Books and Courses",
                            data: "Recommended reading and online courses.",
                        },
                        {
                            icon: FaToolbox,
                            title: "Tool",
                            data: "Best IDEs, debuggers, and other tools.",
                        },
                        {
                            icon: FaUserTie,
                            title: "Interview Preparation",
                            data: "Comprehensive guides and tips for coding interviews.",
                        },
                        {
                            icon: FaCode,
                            title: "Open Source Projects",
                            data: "Contribute to open source projects and build your portfolio.",
                        },
                    ],
                },
            },
        },
    },
};
export const dailyChallenges: Challenge[] = [
    {
        contents: {
            title: "Daily Coding Challenges",
            icon: FaCode,
            color: "#FF5733", // Example color (orange)
            data: [
                {
                    title: "Problem Solving",
                    description:
                        "Solve a new coding problem every day. Improve your problem-solving skills and learn new algorithms and data structures.",
                },
                {
                    title: "Programming Languages",
                    description:
                        "Practice coding in different programming languages. Improve your proficiency in languages like Python, Java, and C++.",
                },
                {
                    title: "Code Review",
                    description:
                        "Get feedback on your code from experienced developers. Learn best practices and improve your coding style.",
                },
            ],
        },
    },
    {
        contents: {
            title: "Competitive Programming",
            icon: FaRocket,
            color: "#36A2EB", // Example color (blue)
            data: [
                {
                    title: "Codeforces",
                    description:
                        "Participate in Codeforces contests. Solve challenging problems and improve your competitive programming skills.",
                },
                {
                    title: "LeetCode",
                    description:
                        "Solve LeetCode problems. Practice coding and improve your problem-solving abilities.",
                },
                {
                    title: "HackerRank",
                    description:
                        "Participate in HackerRank contests. Solve coding challenges and improve your coding skills.",
                },
            ],
        },
    },
    {
        contents: {
            title: "Open Source Contributions",
            icon: FaGithub,
            color: "#4CAF50", // Example color (green)
            data: [
                {
                    title: "Contribute to Open Source Projects",
                    description:
                        "Contribute to GitHub repositories and open source projects. Collaborate with developers worldwide and enhance your coding skills.",
                },
                {
                    title: "Pull Requests and Code Reviews",
                    description:
                        "Submit pull requests and participate in code reviews. Learn from feedback and contribute to the development of open source software.",
                },
                {
                    title: "Version Control",
                    description:
                        "Master version control systems like Git. Learn branching, merging, and collaboration workflows.",
                },
            ],
        },
    },
];

export const mentorshipFeatures: MentorshipFeature[] = [
    {
        title: "One-on-One Mentoring",
        points: [
            {
                title: "Personalized Learning Plans:",
                description:
                    "Work with a mentor to create a customized learning plan based on your goals and interests.",
            },
            {
                title: "Career Advice:",
                description:
                    "Receive guidance on career paths, job applications, and interview preparation.",
            },
            {
                title: "Project Feedback:",
                description:
                    "Get feedback on your projects and code from experienced developers.",
            },
            {
                title: "Mock Interviews:",
                description:
                    "Participate in mock interviews to practice and improve your interview skills.",
            },
        ],
        icon: FaUserTie,
    },
    {
        title: "Group Sessions",
        points: [
            {
                title: "Study Groups:",
                description:
                    "Join study groups to learn with peers. Participate in discussions, share knowledge, and collaborate on projects.",
            },
            {
                title: "Workshops and Webinars:",
                description:
                    "Attend workshops and webinars on various topics, from coding best practices to industry trends. Learn from experts and expand your knowledge.",
            },
            {
                title: "Hackathons:",
                description:
                    "Participate in hackathons to apply your knowledge and work on real-world projects.",
            },
        ],
        icon: FaUsers,
    },
    {
        title: "Career Development",
        points: [
            {
                title: "Resume Building:",
                description:
                    "Get assistance with creating a professional resume that highlights your skills and experiences.",
            },
            {
                title: "Job Search Strategies:",
                description:
                    "Learn effective job search strategies and how to utilize various job search platforms.",
            },
            {
                title: "Networking Tips:",
                description:
                    "Receive tips on how to network effectively within the tech industry.",
            },
            {
                title: "Personal Branding:",
                description:
                    "Develop a strong personal brand to stand out in the job market.",
            },
        ],
        icon: FaBriefcase,
    },
    {
        title: "Technical Skill Development",
        points: [
            {
                title: "Code Reviews:",
                description:
                    "Receive constructive feedback on your code to improve your programming skills.",
            },
            {
                title: "Algorithm Practice:",
                description:
                    "Participate in algorithm challenges and practice sessions to enhance your problem-solving abilities.",
            },
            {
                title: "Tech Stack Exploration:",
                description:
                    "Explore new technologies and frameworks with guidance from experienced mentors.",
            },
        ],
        icon: FaCode,
    },
];