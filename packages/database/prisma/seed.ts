import prisma from '../index.ts'
import bcrypt from 'bcryptjs'

async function main() {
    console.log('🌱 Starting seed...')

    const hashedPassword = await bcrypt.hash('admin123', 10)

    // Upsert a default admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {
            password: hashedPassword,
        },
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: hashedPassword,
        },
    })

    // Seed default Hero section
    const hero = await prisma.heroSection.upsert({
        where: { id: 'default-hero' },
        update: {},
        create: {
            id: 'default-hero',
            name: 'Ahmad Mujtaba',
            title: 'Quantitative Analyst & Developer',
            bio: 'Quantitative Analyst & Developer focused on high-frequency trading systems, stochastic modeling, and algorithmic strategy.',
            typewriterText: ['Analyzing Alpha...', 'Optimizing PnL...', 'All In?', 'Ready to Hedge?'],
            githubUrl: 'https://github.com/AhmadMujtaba200210',
            linkedinUrl: 'https://linkedin.com/in/ahmadmujtaba',
            email: 'admin@example.com',
        },
    })

    console.log('✅ Seed completed successfully.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
