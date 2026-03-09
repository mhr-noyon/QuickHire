const db = require("./db");

const createTables = async () => {
    try {
        console.log("Creating database tables...");
        await db.query(`
            create table if not exists jobs (
                id int auto_increment primary key,
                title varchar(255) not null,
                company varchar(255) not null,
                location varchar(100) not null,
                category varchar(100) not null,
                description text not null,
                created_at timestamp default current_timestamp
            )
        `);
        await db.query(`
            create table if not exists applications (
                id int auto_increment primary key,
                job_id int not null,
                name varchar(255) not null,
                email varchar(255) not null,
                resume_link text not null,
                cover_note text,
                created_at timestamp default current_timestamp,
                foreign key (job_id) references jobs(id) on delete cascade
            )
        `);
        console.log("Tables created successfully!");
    } catch (err) {
        console.error("Error creating tables:", err);
    }
};

const insertDemoData = async () => {
    try {
        const [jobs] = await db.query("select count(*) as count from jobs");
        if (jobs[0].count > 0) {
            console.log("Demo data already exists, skipping insertion.");
            return;
        }

        console.log("Inserting demo data...");
        await db.query(`
            INSERT INTO jobs (title, company, location, category, description) VALUES
            ('Senior Product Designer', 'CreativeFlow', 'Remote', 'Design', 'Lead our UI/UX initiatives for mobile platforms.'),
            ('Sales Executive', 'GrowthScale', 'New York, NY', 'Sales', 'Drive revenue growth by identifying new business opportunities.'),
            ('Digital Marketing Specialist', 'BrandBoost', 'London, UK', 'Marketing', 'Manage SEO, SEM, and social media campaigns.'),
            ('Financial Analyst', 'WealthTrust', 'Chicago, IL', 'Finance', 'Analyze market trends and prepare quarterly reports.'),
            ('Full Stack Developer', 'CodeCrafters', 'Berlin, Germany', 'Technology', 'Build scalable web applications using React and Node.js.'),
            ('Software Architect', 'CloudSystems', 'San Francisco, CA', 'Engineering', 'Design high-level structures of complex software systems.'),
            ('Business Development Manager', 'GlobalTrade', 'Dubai, UAE', 'Business', 'Expand our market presence in the MENA region.'),
            ('HR Manager', 'PeopleFirst', 'Toronto, Canada', 'Human Resource', 'Oversee recruitment and employee relations.'),
            ('Junior UX Researcher', 'UserCentric', 'Austin, TX', 'Design', 'Conduct user interviews and usability testing.'),
            ('Content Strategist', 'MediaMaven', 'Remote', 'Marketing', 'Develop and execute a cohesive content marketing plan.');
        `);
        await db.query(`
            INSERT INTO applications (job_id, name, email, resume_link, cover_note) VALUES
            (1, 'Alice Johnson', 'alice.j@example.com', 'https://drive.google.com/resume_alice', 'I love creating intuitive user interfaces.'),
            (1, 'Mark Spencer', 'm.spencer@webmail.com', 'https://dropbox.com/s/mark_resume.pdf', '10 years of experience in Figma and Adobe XD.'),
            (2, 'Sarah Miller', 'sarah.m@salespro.com', 'https://linkedin.com/in/sarahm/resume', 'Top closer in my previous firm for 3 years.'),
            (3, 'David Chen', 'd.chen@marketing.io', 'https://github.com/dchen/portfolio', 'Expert in Google Ads and data-driven marketing.'),
            (3, 'Emma Wilson', 'emma.w@gmail.com', 'https://resume.io/r/emma_w', 'Passionate about storytelling and brand growth.'),
            (4, 'James Bond', 'j.bond@finance.com', 'https://mi6.gov/res/bond007', 'Strategic thinker with an eye for financial detail.'),
            (5, 'Md. Hosain Rohman', 'noyon@dev.com', 'https://github.com/greenforces', 'Competitive programmer with strong Node.js skills.'),
            (5, 'Liam Garcia', 'liam.g@tech.net', 'https://liam.dev/resume.pdf', 'Full stack expert focused on performance.'),
            (6, 'Sophia Taylor', 'sophia.t@architect.com', 'https://drive.google.com/s/sophia_cv', 'Building robust systems for a decade.'),
            (6, 'Chris Evans', 'c.evans@avenge.com', 'https://shield.com/hr/chris_cv', 'Leader in engineering management and architecture.'),
            (7, 'Olivia Brown', 'olivia.b@biz.com', 'https://olivia.me/resume', 'Fluent in 4 languages and expert in global trade.'),
            (8, 'Daniel Lee', 'd.lee@hrworld.com', 'https://hrworld.com/profiles/dlee', 'Specializing in tech recruitment and culture.'),
            (8, 'Grace Hopper', 'grace.h@pioneer.com', 'https://history.com/cv/grace', 'Expert in organizational logic and human relations.'),
            (9, 'Isabella White', 'isabella.w@design.co', 'https://behance.net/isabella_w', 'Junior designer eager to learn and grow.'),
            (10, 'Lucas Scott', 'l.scott@writer.com', 'https://medium.com/@lscott/portfolio', 'Copywriter with a focus on tech and SaaS.'),
            (10, 'Mia Adams', 'mia.a@content.io', 'https://mia.io/cv', 'Creating viral content is my specialty.'),
            (4, 'Ethan Hunt', 'e.hunt@mission.com', 'https://imf.org/files/ethan_resume', 'High-pressure analyst with great results.'),
            (5, 'Zoe Saldana', 'zoe.s@galaxy.com', 'https://galaxy.net/zoe_cv', 'React and Tailwind enthusiast.'),
            (2, 'Noah Williams', 'noah.w@sales.org', 'https://drive.google.com/noah_sales_cv', 'Result-oriented sales person.'),
            (7, 'Ava Martinez', 'ava.m@trade.com', 'https://martinez.biz/resume', 'Experienced in B2B business development.');
        `);
        console.log("Demo data inserted successfully!");
    } catch (err) {
        console.error("Error inserting demo data:", err);
    }
};

const setupDatabase = async () => {
    await createTables();
    await insertDemoData();
};

module.exports = setupDatabase;
