import prisma from "../index.ts";
import bcrypt from "bcryptjs";

type BlogSeed = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categories: string[];
    tags: string[];
    publishedAt: Date;
};

const heroData = {
    id: "default-hero",
    name: "Muhammad Ahmad Mujtaba Mahmood",
    title: "Quantitative Finance Graduate Student | Junior Analyst",
    bio: "MS Quantitative Finance candidate focused on factor modeling, systematic research, and production-grade data engineering for investment workflows.",
    githubUrl: "https://github.com/AhmadMujtaba200210",
    linkedinUrl: "https://www.linkedin.com/in/ahmadmujtaba200210",
    email: "mujtaba200210@gmail.com",
    typewriterText: [
        "Building Alpha with Discipline.",
        "Quant + ML + Systems.",
        "Research. Backtest. Execute.",
        "Risk First, Returns Second.",
    ],
};

const projects = [
    {
        title: "Quantitative Data Pipeline & Factor Engineering",
        description:
            "Built a leakage-aware equity research pipeline with strict time-based data availability checks. Engineered momentum and rolling beta factors and exported a structured HDF5 dataset for robust cross-sectional testing.",
        category: "Quantitative Research",
        techStack: ["Python", "pandas", "NumPy", "HDF5", "Factor Modeling"],
        githubUrl: null,
        demoUrl: null,
        order: 0,
        published: true,
    },
    {
        title: "Linear PCA vs Deep Autoencoders for Risk Factors",
        description:
            "Designed a comparative framework in PyTorch to extract latent risk drivers from S&P 500 returns. The non-linear autoencoder improved reconstruction in calm regimes, while PCA remained more stable in stress regimes for hedging.",
        category: "Machine Learning for Finance",
        techStack: ["PyTorch", "Python", "PCA", "Autoencoders", "Time Series"],
        githubUrl: null,
        demoUrl: null,
        order: 1,
        published: true,
    },
    {
        title: "Intraday Momentum Strategy on SPY (1-Minute Data)",
        description:
            "Implemented an intraday momentum strategy with volatility-targeted sizing and VWAP-aware trailing stops. Backtests on 2008-2020 SPY data achieved 18.2% annualized return with Sharpe above 1.0 under realistic transaction costs.",
        category: "Systematic Trading",
        techStack: ["Python", "Pandas", "Backtesting", "Risk Management", "OHLCV"],
        githubUrl: null,
        demoUrl: null,
        order: 2,
        published: true,
    },
    {
        title: "ASML Equity Research & Scenario Valuation",
        description:
            "Co-authored an investment pitch on ASML by combining bottom-up financial analysis with scenario-based valuation. Built revenue sensitivity and policy risk views to quantify upside/downside dispersion under multiple demand environments.",
        category: "Equity Research",
        techStack: ["Financial Modeling", "Valuation", "Scenario Analysis", "Semiconductors"],
        githubUrl: null,
        demoUrl: null,
        order: 3,
        published: true,
    },
];

const skillCategories = [
    {
        title: "Programming & Data Systems",
        order: 0,
        published: true,
        skills: [
            { name: "Python", icon: "Code2", color: "text-blue-500", proficiency: 95, order: 0 },
            { name: "SQL", icon: "Database", color: "text-cyan-500", proficiency: 90, order: 1 },
            { name: "Java", icon: "Coffee", color: "text-orange-500", proficiency: 80, order: 2 },
            { name: "C++", icon: "Cpu", color: "text-indigo-500", proficiency: 72, order: 3 },
            { name: "Git", icon: "GitBranch", color: "text-emerald-500", proficiency: 88, order: 4 },
            { name: "AWS", icon: "Cloud", color: "text-amber-500", proficiency: 78, order: 5 },
            { name: "Spring Boot", icon: "Layers", color: "text-green-500", proficiency: 75, order: 6 },
            { name: "Jupyter Lab", icon: "Terminal", color: "text-purple-500", proficiency: 90, order: 7 },
        ],
    },
    {
        title: "Quantitative Methods & Risk",
        order: 1,
        published: true,
        skills: [
            { name: "Probability & Statistics", icon: "Sigma", color: "text-blue-500", proficiency: 92, order: 0 },
            { name: "Econometrics", icon: "LineChart", color: "text-cyan-500", proficiency: 86, order: 1 },
            { name: "Time-Series Modeling", icon: "Activity", color: "text-emerald-500", proficiency: 88, order: 2 },
            { name: "Monte Carlo Simulation", icon: "Calculator", color: "text-indigo-500", proficiency: 87, order: 3 },
            { name: "Optimization (LP/QP)", icon: "BarChart3", color: "text-orange-500", proficiency: 84, order: 4 },
            { name: "VaR / CVaR", icon: "ShieldAlert", color: "text-rose-500", proficiency: 82, order: 5 },
            { name: "Factor Models", icon: "TrendingUp", color: "text-sky-500", proficiency: 90, order: 6 },
            { name: "Derivatives Pricing", icon: "Library", color: "text-violet-500", proficiency: 80, order: 7 },
        ],
    },
    {
        title: "Machine Learning for Finance",
        order: 2,
        published: true,
        skills: [
            { name: "Regression & Classification", icon: "BrainCircuit", color: "text-blue-500", proficiency: 90, order: 0 },
            { name: "MLP", icon: "Brain", color: "text-cyan-500", proficiency: 84, order: 1 },
            { name: "Autoencoders", icon: "Network", color: "text-indigo-500", proficiency: 86, order: 2 },
            { name: "LLM / RAG", icon: "Flame", color: "text-orange-500", proficiency: 75, order: 3 },
            { name: "Feature Engineering", icon: "BoxSelect", color: "text-emerald-500", proficiency: 89, order: 4 },
            { name: "Model Backtesting", icon: "BarChart3", color: "text-violet-500", proficiency: 85, order: 5 },
        ],
    },
    {
        title: "Finance Platforms & Libraries",
        order: 3,
        published: true,
        skills: [
            { name: "Bloomberg Terminal", icon: "Globe", color: "text-amber-500", proficiency: 78, order: 0 },
            { name: "QuantLib", icon: "Calculator", color: "text-sky-500", proficiency: 72, order: 1 },
            { name: "NumPy / pandas", icon: "Database", color: "text-blue-500", proficiency: 93, order: 2 },
            { name: "scikit-learn", icon: "BrainCircuit", color: "text-cyan-500", proficiency: 87, order: 3 },
            { name: "TensorFlow", icon: "Cpu", color: "text-orange-500", proficiency: 76, order: 4 },
            { name: "LaTeX", icon: "Sigma", color: "text-emerald-500", proficiency: 80, order: 5 },
        ],
    },
];

const spotlightItems = [
    {
        title: "Junior Analyst - 360 Huntington Fund",
        description:
            "Performed fundamental and quantitative analysis on semiconductor equities, and co-authored an investment pitch on ASML with structured valuation and risk scenarios.",
        icon: "Award",
        date: "Sep 2025 - Dec 2025",
        order: 0,
        published: true,
    },
    {
        title: "Data Engineering - Global Financial Media",
        description:
            "Designed Spring Boot and AWS backend systems and automated cross-database synchronization for reliable high-frequency data delivery and analytics.",
        icon: "Zap",
        date: "Jun 2024 - Jan 2025",
        order: 1,
        published: true,
    },
    {
        title: "M.S. Quantitative Finance - Northeastern University",
        description:
            "Relevant coursework: stochastic processes, optimization, empirical finance, numerical methods, factor modeling, and machine learning for finance.",
        icon: "Star",
        date: "Expected Dec 2026",
        order: 2,
        published: true,
    },
    {
        title: "Machine Learning Specialization - Cornell University",
        description:
            "Specialization track focused on practical ML foundations and applied modeling workflows for quantitative decision systems.",
        icon: "Star",
        date: "Expected Aug 2026",
        order: 3,
        published: true,
    },
    {
        title: "B.S. Computer Science - CASE Institute of Technology",
        description:
            "Built strong foundations in algorithms, software systems, and applied engineering for data-intensive applications.",
        icon: "Award",
        date: "Graduated May 2024",
        order: 4,
        published: true,
    },
    {
        title: "Certifications: Bloomberg, Wall Street Prep, QFI",
        description:
            "Completed Bloomberg Market Concepts, Wall Street Prep Excel Crash Course, and Quantitative Finance Institute Bootcamp.",
        icon: "Zap",
        date: "Professional Development",
        order: 5,
        published: true,
    },
];

const siteSettings = [
    { key: "SEO_TITLE", value: "%s | Muhammad Ahmad Mujtaba Mahmood", description: "Global SEO title template" },
    { key: "SEO_DESC", value: "Quantitative finance portfolio featuring systematic research, data engineering, and machine learning projects.", description: "Global SEO description" },
    { key: "GA_ID", value: "", description: "Google Analytics Measurement ID" },
    { key: "POSTHOG_KEY", value: "", description: "PostHog project key" },
    { key: "SOCIAL_LINKEDIN", value: "https://www.linkedin.com/in/ahmadmujtaba200210", description: "LinkedIn URL" },
    { key: "SOCIAL_TWITTER", value: "", description: "X/Twitter handle or URL" },
    { key: "SOCIAL_GITHUB", value: "https://github.com/AhmadMujtaba200210", description: "GitHub URL" },
    { key: "CONTACT_EMAIL", value: "mujtaba200210@gmail.com", description: "Primary contact email" },
    { key: "COPYRIGHT", value: "© 2026 Muhammad Ahmad Mujtaba Mahmood. All rights reserved.", description: "Footer copyright text" },
    { key: "LOCATION", value: "Westborough, MA, USA", description: "Location for About page" },
    { key: "EXPERIENCE_YEARS", value: "2+ Years", description: "Experience label for About page" },
];

const blogSeeds: BlogSeed[] = [
    {
        title: "Why Most Quant Signals Die in Production (And How to Save Them)",
        slug: "why-most-quant-signals-die-in-production",
        excerpt: "Strong in-sample signals often collapse live. The failure is usually engineering and validation design, not pure math.",
        categories: ["Quantitative Research", "Production Systems"],
        tags: ["Signal Decay", "MLOps", "Backtesting", "Execution"],
        publishedAt: new Date("2026-02-01T14:00:00.000Z"),
        content: `
<h2>The illusion of a perfect backtest</h2>
<p>Many strategies fail after deployment because the research stack is optimized for backtest sharpness, not for live robustness. In-sample quality can hide fragility from latency, slippage, and parameter instability.</p>
<h2>Three failure channels</h2>
<h3>1) Structural leakage</h3>
<p>Leakage is no longer only target leakage. Timestamp drift, asynchronous joins, and corrected data revisions can leak future information in subtle ways. The result is inflated historical edge.</p>
<h3>2) Execution mismatch</h3>
<p>Strategies tested on mid-prices but executed on real fills will overstate alpha. Spread expansion and queue position effects become dominant when turnover is high.</p>
<h3>3) Regime-dependent assumptions</h3>
<p>A parameter set calibrated in low-volatility environments often breaks during macro shocks. If your model has no regime stress protocol, it is overfit by definition.</p>
<h2>A practical rescue framework</h2>
<p>Enforce strict point-in-time data contracts, simulate execution with realistic cost models, and maintain rolling walk-forward diagnostics. When a signal underperforms, classify the break as data drift, market structure drift, or model misspecification before any re-tuning.</p>
<h2>Final point</h2>
<p>Production alpha is not found. It is engineered, monitored, and continuously defended.</p>
`,
    },
    {
        title: "LLMs in Quant Workflows: Where They Add Real Edge",
        slug: "llms-in-quant-workflows-where-they-add-real-edge",
        excerpt: "LLMs are useful in quant finance when applied to research operations and hypothesis generation, not as a direct price oracle.",
        categories: ["Machine Learning for Finance", "Research Engineering"],
        tags: ["LLM", "RAG", "NLP", "Research Ops"],
        publishedAt: new Date("2026-02-08T14:00:00.000Z"),
        content: `
<h2>The wrong use case: direct return prediction</h2>
<p>Using a general LLM to forecast next-period returns without domain controls typically yields unstable and non-stationary outputs. Financial markets punish generic pattern matching.</p>
<h2>The right use cases</h2>
<h3>1) Research acceleration</h3>
<p>LLMs can summarize filings, call transcripts, and macro releases into structured candidate factors. This reduces time-to-hypothesis dramatically.</p>
<h3>2) Retrieval-grounded analysis</h3>
<p>RAG pipelines constrain generation to trusted internal corpora and dated sources. This prevents hallucinated narratives and improves reproducibility.</p>
<h3>3) Monitoring and post-trade diagnostics</h3>
<p>LLMs can convert model logs and risk alerts into interpretable incident reports for faster human triage.</p>
<h2>Operational rules that matter</h2>
<p>Never let generated text flow directly into trading decisions. Keep human approval for hypothesis promotion, enforce citation checks, and log all prompts/results for auditability.</p>
<h2>Bottom line</h2>
<p>LLMs are best treated as force multipliers for analysts and researchers, not as autonomous alpha engines.</p>
`,
    },
    {
        title: "Regime-Aware Portfolio Construction with CVaR and Factor Caps",
        slug: "regime-aware-portfolio-construction-with-cvar-and-factor-caps",
        excerpt: "A modern portfolio process should optimize expected return under tail-risk controls and explicit factor exposure constraints.",
        categories: ["Portfolio Construction", "Risk Management"],
        tags: ["CVaR", "Optimization", "Factor Risk", "Regime Modeling"],
        publishedAt: new Date("2026-02-15T14:00:00.000Z"),
        content: `
<h2>Why mean-variance is not enough</h2>
<p>Classical optimization assumes stable covariance and symmetric risk. Real markets are non-stationary and losses are asymmetric. Portfolio design needs explicit tail controls.</p>
<h2>A more robust objective</h2>
<h3>Expected return term</h3>
<p>Use conservative forecasts, shrink unstable signals, and penalize turnover directly in the objective.</p>
<h3>Tail-risk term (CVaR)</h3>
<p>Control expected loss in the worst alpha-percent scenarios. CVaR captures crash sensitivity better than variance alone.</p>
<h3>Factor exposure caps</h3>
<p>Constrain net exposures to market, size, value, and momentum factors. This prevents hidden concentration when one style dominates the sample window.</p>
<h2>Regime conditioning</h2>
<p>Estimate separate risk structures for calm and stress states. Switch constraint tightness and turnover budgets based on regime probability rather than fixed policy.</p>
<h2>Implementation takeaway</h2>
<p>Robust portfolio construction is a control system. The winner is not the portfolio with the highest historical CAGR, but the one that survives and compounds across changing regimes.</p>
`,
    },
];

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function estimateReadingTime(html: string) {
    const plainText = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const words = plainText ? plainText.split(" ").length : 0;
    return Math.max(1, Math.ceil(words / 200));
}

async function clearPortfolioContent() {
    await prisma.blogPost.deleteMany();
    await prisma.blogCategory.deleteMany();
    await prisma.blogTag.deleteMany();
    await prisma.project.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.skillCategory.deleteMany();
    await prisma.spotlightItem.deleteMany();
    await prisma.siteSettings.deleteMany();
}

async function seedSkills() {
    for (const category of skillCategories) {
        const createdCategory = await prisma.skillCategory.create({
            data: {
                title: category.title,
                order: category.order,
                published: category.published,
            },
        });

        for (const skill of category.skills) {
            await prisma.skill.create({
                data: {
                    ...skill,
                    categoryId: createdCategory.id,
                },
            });
        }
    }
}

async function seedBlogs(authorId: string) {
    for (const post of blogSeeds) {
        await prisma.blogPost.create({
            data: {
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                published: true,
                publishedAt: post.publishedAt,
                readingTime: estimateReadingTime(post.content),
                views: 0,
                authorId,
                seoTitle: `${post.title} | Muhammad Ahmad Mujtaba Mahmood`,
                seoDescription: post.excerpt,
                categories: {
                    connectOrCreate: post.categories.map((category) => ({
                        where: { slug: slugify(category) },
                        create: {
                            name: category,
                            slug: slugify(category),
                        },
                    })),
                },
                tags: {
                    connectOrCreate: post.tags.map((tag) => ({
                        where: { slug: slugify(tag) },
                        create: {
                            name: tag,
                            slug: slugify(tag),
                        },
                    })),
                },
            },
        });
    }
}

async function main() {
    console.log("Starting full profile seed...");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            name: heroData.name,
            password: hashedPassword,
        },
        create: {
            email: adminEmail,
            name: heroData.name,
            password: hashedPassword,
        },
    });

    await clearPortfolioContent();

    await prisma.heroSection.upsert({
        where: { id: heroData.id },
        update: {
            name: heroData.name,
            title: heroData.title,
            bio: heroData.bio,
            githubUrl: heroData.githubUrl,
            linkedinUrl: heroData.linkedinUrl,
            email: heroData.email,
            typewriterText: heroData.typewriterText,
        },
        create: heroData,
    });

    await prisma.project.createMany({
        data: projects,
    });

    await seedSkills();

    await prisma.spotlightItem.createMany({
        data: spotlightItems,
    });

    await prisma.siteSettings.createMany({
        data: siteSettings,
    });

    await seedBlogs(admin.id);

    const [projectCount, categoryCount, skillCount, spotlightCount, settingCount, blogCount] = await Promise.all([
        prisma.project.count(),
        prisma.skillCategory.count(),
        prisma.skill.count(),
        prisma.spotlightItem.count(),
        prisma.siteSettings.count(),
        prisma.blogPost.count(),
    ]);

    console.log("Profile seed complete.");
    console.log(`Projects: ${projectCount}`);
    console.log(`Skill categories: ${categoryCount}`);
    console.log(`Skills: ${skillCount}`);
    console.log(`Spotlight items: ${spotlightCount}`);
    console.log(`Settings: ${settingCount}`);
    console.log(`Blog posts: ${blogCount}`);
    console.log(`Admin user: ${admin.email}`);
}

main()
    .catch(async (error) => {
        console.error("Profile seed failed:", error);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
