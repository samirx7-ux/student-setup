/**
 * data.js
 * Mock database for Student Setup (SP) App
 */

const mockData = {
    user: {
        name: "Student",
        level: "12th",
        targetDegree: "Bachelor",
        interests: ["Technology", "Business"],
        savedUniversities: [],
        savedPrograms: [],
        skillProgress: {
            "Python": 45,
            "Public Speaking": 20
        }
    },
    universities: [
        {
            id: "u1",
            name: "Indian Institute of Technology Bombay",
            shortName: "IIT Bombay",
            type: "Government",
            location: "Mumbai, Maharashtra",
            ranking: "1 in Engineering (NIRF)",
            overview: "IIT Bombay is a premier public technical and research university known globally for its engineering programs and vibrant campus life.",
            admission: "JEE Advanced for UG, GATE for PG.",
            placements: "Average CTC 21.82 LPA, Highest 3.67 CPA",
            website: "https://www.iitb.ac.in",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "u2",
            name: "University of Delhi",
            shortName: "DU",
            type: "Government",
            location: "New Delhi",
            ranking: "11 in University (NIRF)",
            overview: "DU is a collegiate public central university known for its high standards in teaching and research.",
            admission: "CUET (Common University Entrance Test) for UG and PG.",
            placements: "Average CTC 6-8 LPA (depends on college)",
            website: "https://www.du.ac.in",
            image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "u3",
            name: "BITS Pilani",
            shortName: "BITS",
            type: "Private",
            location: "Pilani, Rajasthan",
            ranking: "25 in Engineering (NIRF)",
            overview: "One of India's top private institutes offering engineering, sciences, and management programs with zero mandated attendance.",
            admission: "BITSAT exam.",
            placements: "Average CTC 30.37 LPA",
            website: "https://www.bits-pilani.ac.in",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "u4",
            name: "VIT Vellore",
            shortName: "VIT",
            type: "Private",
            location: "Vellore, Tamil Nadu",
            ranking: "11 in Engineering (NIRF)",
            overview: "A highly sought-after private institute with excellent infrastructure and placement records.",
            admission: "VITEEE exam.",
            placements: "Average CTC 9.23 LPA, Highest 1.02 CPA",
            website: "https://vit.ac.in",
            image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ],
    programs: [
        {
            id: "p1",
            title: "B.Tech in Computer Science",
            level: "Bachelor",
            duration: "4 Years",
            eligibility: "10+2 with Physics, Chemistry, Mathematics (min 60%)",
            exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
            feeStructure: "Government: ₹1-2 Lakhs/yr | Private: ₹3-5 Lakhs/yr",
            careerOpts: ["Software Engineer", "Data Scientist", "AI Developer", "Product Manager"],
            topUnis: ["IIT Bombay", "BITS Pilani", "VIT Vellore", "NIT Trichy"]
        },
        {
            id: "p2",
            title: "B.Com (Hons.)",
            level: "Bachelor",
            duration: "3 Years",
            eligibility: "10+2 in any stream (Commerce preferred, min 50-60%)",
            exams: ["CUET", "IPMAT (for integrated)"],
            feeStructure: "Government: ₹10k-30k/yr | Private: ₹1-3 Lakhs/yr",
            careerOpts: ["Accountant", "Financial Analyst", "Tax Consultant", "Investment Banker"],
            topUnis: ["University of Delhi (SRCC)", "Christ University", "Narsee Monjee"]
        },
        {
            id: "p3",
            title: "MBA",
            level: "Master",
            duration: "2 Years",
            eligibility: "Bachelor's degree in any discipline (min 50%)",
            exams: ["CAT", "XAT", "GMAT", "MAT"],
            feeStructure: "Government (IIMs): ₹15-25 Lakhs | Private: ₹10-30 Lakhs",
            careerOpts: ["Management Consultant", "Marketing Manager", "Investment Banker"],
            topUnis: ["IIM Ahmedabad", "IIM Bangalore", "ISB Hyderabad", "FMS Delhi"]
        }
    ],
    skills: {
        categories: ["Communication", "Coding", "Career"],
        items: [
            {
                id: "s1",
                category: "Coding",
                name: "Python Programming",
                levels: ["Beginner", "Intermediate", "Advanced"],
                icon: "logo-python",
                color: "var(--accent-blue)"
            },
            {
                id: "s2",
                category: "Coding",
                name: "Web Development",
                levels: ["Beginner", "Intermediate", "Advanced"],
                icon: "globe-outline",
                color: "var(--accent-purple)"
            },
            {
                id: "s3",
                category: "Communication",
                name: "Public Speaking",
                levels: ["Beginner", "Intermediate"],
                icon: "mic-outline",
                color: "var(--accent-orange)"
            },
            {
                id: "s4",
                category: "Communication",
                name: "English Fluency",
                levels: ["Beginner", "Intermediate", "Advanced"],
                icon: "chatbubbles-outline",
                color: "#ff3b30"
            },
            {
                id: "s5",
                category: "Career",
                name: "Resume Building",
                levels: ["Beginner"],
                icon: "document-text-outline",
                color: "#34c759"
            },
            {
                id: "s6",
                category: "Career",
                name: "LinkedIn Optimization",
                levels: ["Beginner", "Intermediate"],
                icon: "logo-linkedin",
                color: "#0077b5"
            }
        ]
    }
};

window.appData = mockData;
