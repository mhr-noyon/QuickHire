const db = require("./db");

const createTables = async () => {
    try {
        console.log("Creating database tables...");
        await db.query(`
            create table if not exists jobs (
                id int auto_increment primary key,
                title varchar(255) not null,
                company varchar(255) not null,
                logo TEXT,
                location varchar(100) not null,
                category TEXT not null,
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
        // insert random timestamps for created_at
        console.log("Inserting demo data...");
        await db.query(`
           INSERT INTO jobs (title, company, logo, location, category, description, created_at) VALUES
           ('Email Marketing Specialist', 'Revolut', '/featuredJobs/BvBoaEET.png', 'Madrid, Spain', 'Marketing, Design', 
             'Revolut is looking for a data-driven Email Marketing Specialist to spearhead our customer lifecycle journeys. You will be responsible for designing, executing, and optimizing high-impact email campaigns that improve user retention and drive global brand loyalty through personalized storytelling.', '2025-05-01 10:00:00'),
            
            ('Brand Designer', 'Dropbox', '/featuredJobs/dropbox.png', 'San Fransisco, US', 'Design, Business', 
             'We are seeking a creative Brand Designer to help Dropbox define the next chapter of our visual identity. You will work across marketing and product teams to deliver consistent, delightful brand experiences that resonate with millions of users while maintaining our core design principles.', '2025-05-02 11:30:00'),
            
            ('Email Marketing Manager', 'Pitch', '/featuredJobs/pitch.png', 'Berlin, Germany', 'Marketing', 
             'Pitch is looking for an Email Marketing Manager to join our growing growth team. In this role, you will build automated workflows and craft compelling copy that drives user engagement, ensuring our community stays informed and excited about the future of collaborative presentations.', '2025-05-03 09:15:00'),
            
            ('Visual Designer', 'Blinkist', '/featuredJobs/blinkist.png', 'Granada, Spain', 'Design', 
             'As a Visual Designer at Blinkist, you will be the guardian of our aesthetic presence. You will design compelling assets for social media, app interfaces, and marketing collateral, ensuring that our mission of making big ideas accessible is reflected in every pixel we share.', '2025-05-04 14:20:00'),
            
            ('Product Designer', 'ClassPass', '/featuredJobs/classpass.png', 'Manchester, UK', 'Marketing, Design', 
             'ClassPass is hunting for a Product Designer who thrives on solving complex user problems. You will research, wireframe, and prototype intuitive user experiences for our global fitness community, ensuring that booking a workout is as seamless and motivating as the class itself.', '2025-05-05 09:00:00'),
            
            ('Lead Designer', 'Canva', '/featuredJobs/canva.png', 'Ontario, Canada', 'Design, Business', 
             'Canva is looking for a Lead Designer to mentor our creative talent and shape the future of visual communication. You will oversee high-level design strategies, bridge the gap between business goals and user needs, and ensure our platform remains the world’s most accessible design tool.', '2025-05-06 11:45:00'),
            
            ('Brand Strategist', 'GoDaddy', '/featuredJobs/godaddy.png', 'Marseille, France', 'Marketing', 
             'GoDaddy is seeking a Brand Strategist to join our European marketing hub. You will develop effective brand positioning and long-term communication strategies that empower small business owners to build their digital identities with confidence and clarity.', '2025-05-07 13:30:00'),
            
            ('Data Analyst', 'Twitter', '/featuredJobs/twitter.png', 'San Diego, US', 'Technology', 
             'Twitter is looking for a Data Analyst to join our performance team. You will leverage large-scale datasets to uncover actionable insights, measure campaign effectiveness, and build robust dashboards that support critical, data-driven decisions across the organization.', '2025-05-08 10:00:00'),

            ('Senior Product Designer', 'CreativeFlow', NULL, 'Remote', 'Design, Technology', 
             'We are looking for a Senior Product Designer to lead our UI/UX initiatives across mobile and web platforms. You will collaborate with cross-functional teams to create intuitive user journeys and maintain our design system.', '2024-05-09 15:00:00'),
            
            ('Sales Executive', 'GrowthScale', NULL, 'New York, NY', 'Sales, Business', 
             'Seeking a high-energy Sales Executive to drive revenue growth. You will be responsible for identifying new business opportunities, managing the sales pipeline, and closing deals with enterprise clients.', '2024-05-10 09:00:00'),
            
            ('Digital Marketing Specialist', 'BrandBoost', NULL, 'London, UK', 'Marketing', 
             'Join our team as a Digital Marketing Specialist to manage multi-channel campaigns. You will oversee SEO, SEM, and social media strategies to increase brand awareness and drive user acquisition.', '2024-05-10 10:00:00'),
            
            ('Financial Analyst', 'WealthTrust', NULL, 'Chicago, IL', 'Finance', 
             'As a Financial Analyst, you will analyze market trends and prepare detailed quarterly reports. Your insights will help guide our investment strategies and long-term financial planning.', '2024-05-10 11:00:00'),
            
            ('Full Stack Developer', 'CodeCrafters', NULL, 'Berlin, Germany', 'Engineering, Technology', 
             'We need a Full Stack Developer to build and maintain scalable web applications. The ideal candidate has deep expertise in React.js for the frontend and Node.js with MySQL for the backend architecture.', '2024-05-10 12:00:00'),
            
            ('Software Architect', 'CloudSystems', NULL, 'San Francisco, CA', 'Engineering, Technology', 
             'Lead the technical vision at CloudSystems as a Software Architect. You will design high-level structures of complex software systems, ensuring scalability, security, and high performance across cloud infrastructures.', '2024-05-10 13:00:00'),
            
            ('Business Development Manager', 'GlobalTrade', NULL, 'Dubai, UAE', 'Business, Sales', 
             'Help us expand our market presence in the MENA region. You will develop strategic partnerships, analyze market entry points, and represent our brand in high-level business negotiations.', '2024-05-10 14:00:00'),
            
            ('HR Manager', 'PeopleFirst', NULL, 'Toronto, Canada', 'Human Resource', 
             'Seeking an HR Manager to oversee recruitment, employee relations, and company culture. You will play a key role in talent acquisition and developing internal policies that foster a productive work environment.', '2024-05-10 15:00:00'),
            
            ('Junior UX Researcher', 'UserCentric', NULL, 'Austin, TX', 'Design', 
             'Support our product team by conducting user interviews and usability testing. You will gather qualitative data and transform user feedback into actionable insights for our design and engineering departments.', '2024-05-10 16:00:00'),
            
            ('Content Strategist', 'MediaMaven', NULL, 'Remote', 'Marketing, Business', 
             'Develop and execute a cohesive content marketing plan that aligns with our business goals. You will manage a team of writers and ensure all content is optimized for engagement and conversion.', '2024-05-10 17:00:00')
        `);
        await db.query(`
            INSERT INTO applications (job_id, name, email, resume_link, cover_note, created_at) VALUES
            -- Job 1: Email Marketing Specialist (Revolut)
            (1, 'Alice Johnson', 'alice.j@example.com', 'https://drive.google.com/resume_alice', 'I love creating intuitive user interfaces and lifecycle emails.', '2024-05-10 18:00:00'),
            (1, 'Mark Spencer', 'm.spencer@webmail.com', 'https://dropbox.com/s/mark_resume.pdf', '10 years of experience in retention marketing and Figma.', '2024-05-10 18:00:00'),
            (1, 'Lily Evans', 'lily.e@protonmail.com', 'https://lily.dev/cv', 'Specialist in A/B testing and email automation.', '2024-05-10 18:00:00'),
            
            -- Job 2: Brand Designer (Dropbox)
            (2, 'Sarah Miller', 'sarah.m@salespro.com', 'https://linkedin.com/in/sarahm/resume', 'Strong focus on visual identity and brand consistency.', '2024-05-10 18:00:00'),
            (2, 'Noah Williams', 'noah.w@sales.org', 'https://drive.google.com/noah_sales_cv', 'Experienced in delivering consistent brand experiences for SaaS.', '2024-05-10 18:00:00'),
            (2, 'Oliver Queen', 'arrow@starling.city', 'https://queen.ent/cv', 'Expert in vector illustrations and modern brand guidelines.', '2024-05-10 18:00:00'),
            
            -- Job 3: Email Marketing Manager (Pitch)
            (3, 'David Chen', 'd.chen@marketing.io', 'https://github.com/dchen/portfolio', 'Expert in Google Ads and data-driven email marketing.', '2024-05-10 18:00:00'),
            (3, 'Emma Wilson', 'emma.w@gmail.com', 'https://resume.io/r/emma_w', 'Passionate about storytelling and engagement growth.', '2024-05-10 18:00:00'),
            (3, 'Barry Allen', 'fastest.man@star-labs.com', 'https://flash.resume/cv', 'Fast-paced campaign management and automation expert.', '2024-05-10 18:00:00'),

            -- Job 4: Visual Designer (Blinkist)
            (4, 'James Bond', 'j.bond@finance.com', 'https://mi6.gov/res/bond007', 'Strategic thinker with an eye for visual detail.', '2024-05-10 18:00:00'),
            (4, 'Ethan Hunt', 'e.hunt@mission.com', 'https://imf.org/files/ethan_resume', 'High-pressure designer with great results in fast environments.', '2024-05-10 18:00:00'),
            (4, 'Diana Prince', 'diana@themyscira.gov', 'https://amazon.dev/resume', 'Merging classical art aesthetics with modern digital design.', '2024-05-10 18:00:00'),

            -- Job 5: Product Designer (ClassPass)
            (5, 'Md. Hosain Rohman', 'noyon@dev.com', 'https://github.com/greenforces', 'Competitive programmer with a deep interest in UI/UX systems.', '2024-05-10 18:00:00'),
            (5, 'Liam Garcia', 'liam.g@tech.net', 'https://liam.dev/resume.pdf', 'Full stack designer focused on high-performance user journeys.', '2024-05-10 18:00:00'),
            (5, 'Zoe Saldana', 'zoe.s@galaxy.com', 'https://galaxy.net/zoe_cv', 'React and Tailwind enthusiast with a passion for fitness apps.', '2024-05-10 18:00:00'),
            (5, 'Victor Stone', 'cyborg@titans.com', 'https://stone.systems/cv', 'Expert in human-machine interface and accessibility design.', '2024-05-10 18:00:00'),

            -- Job 6: Lead Designer (Canva)
            (6, 'Sophia Taylor', 'sophia.t@architect.com', 'https://drive.google.com/s/sophia_cv', 'Building robust design systems for over a decade.', '2024-05-10 18:00:00'),
            (6, 'Chris Evans', 'c.evans@avenge.com', 'https://shield.com/hr/chris_cv', 'Leader in creative management and design architecture.', '2024-05-10 18:00:00'),
            (6, 'Tony Stark', 'tony@starkindustries.com', 'https://stark.inc/ceo_resume', 'Visionary design leader focused on the future of communication.', '2024-05-10 18:00:00'),

            -- Job 7: Brand Strategist (GoDaddy)
            (7, 'Olivia Brown', 'olivia.b@biz.com', 'https://olivia.me/resume', 'Fluent in 4 languages and expert in global brand strategy.', '2024-05-10 18:00:00'),
            (7, 'Ava Martinez', 'ava.m@trade.com', 'https://martinez.biz/resume', 'Experienced in B2B business development and communication.', '2024-05-10 18:00:00'),
            (7, 'Arthur Curry', 'king@atlantis.org', 'https://ocean.cv/resume', 'Specializing in deep-dive market research and positioning.', '2024-05-10 18:00:00' ),

            -- Job 8: Data Analyst (Twitter)
            (8, 'Daniel Lee', 'd.lee@hrworld.com', 'https://hrworld.com/profiles/dlee', 'Specializing in data cleaning and performance metrics.', '2024-05-10 18:00:00'),
            (8, 'Grace Hopper', 'grace.h@pioneer.com', 'https://history.com/cv/grace', 'Expert in data logic and statistical analysis.', '2024-05-10 18:00:00'),
            (8, 'Bruce Wayne', 'bruce@waynecorp.com', 'https://bat.dev/resume', 'Exceptional at uncovering hidden insights in complex datasets.', '2024-05-10 18:00:00'),
            (8, 'Barbara Gordon', 'oracle@gcpd.gov', 'https://library.org/resume', 'Highly skilled in SQL, Python, and predictive modeling.', '2024-05-10 18:00:00'),

            -- Job 9: Senior Product Designer (CreativeFlow)
            (9, 'Isabella White', 'isabella.w@design.co', 'https://behance.net/isabella_w', 'Senior designer eager to lead UI/UX for web and mobile.', '2024-05-10 18:00:00'),
            (9, 'Peter Parker', 'pete@dailybugle.com', 'https://spiderman.dev/cv', 'Great responsibility in creating intuitive user experiences.', '2024-05-10 18:00:00'),
            (9, 'Wanda Maximoff', 'wanda@chaos.magic', 'https://vision.dev/cv', 'Experience in designing reality-bending interfaces.', '2024-05-10 18:00:00'),

            -- Job 10: Sales Executive (GrowthScale)
            (10, 'Lucas Scott', 'l.scott@writer.com', 'https://medium.com/@lscott/portfolio', 'Result-oriented sales person with high conversion rates.', '2024-05-10 18:00:00'),
            (10, 'Mia Adams', 'mia.a@content.io', 'https://mia.io/cv', 'Passionate about enterprise sales and relationship building.', '2024-05-10 18:00:00'),
            (10, 'Harvey Specter', 'harvey@pearsonhardman.com', 'https://specter.legal/cv', 'I dont take meetings, I close deals.', '2024-05-10 18:00:00'),

            -- Job 11: Digital Marketing Specialist (BrandBoost)
            (11, 'Selina Kyle', 'selina@cat.meow', 'https://gotham.city/cv', 'Stealthy marketing strategies and SEO expert.', '2024-05-10 18:00:00'),
            (11, 'Hal Jordan', 'hal@greenlantern.com', 'https://sector2814.org/cv', 'Brightest light in digital campaign management.', '2024-05-10 18:00:00'),

            -- Job 12: Financial Analyst (WealthTrust)
            (12, 'Clark Kent', 'clark@dailyplanet.com', 'https://metropolis.news/cv', 'Fastest reporter—now applying super-speed to financial analysis.', '2024-05-10 18:00:00'),
            (12, 'Lex Luthor', 'lex@lexcorp.com', 'https://lex.com/ceo', 'I understand wealth and market trends better than anyone.', '2024-05-10 18:00:00'),

            -- Job 13: Full Stack Developer (CodeCrafters)
            (13, 'Reed Richards', 'reed@fantastic.four', 'https://baxter.building/cv', 'Solving the most complex full-stack problems in the universe.', '2024-05-10 18:00:00'),
            (13, 'Sue Storm', 'sue@fantastic.four', 'https://baxter.building/sue_cv', 'Invisible architecture expert with visible results.', '2024-05-10 18:00:00'),

            -- Job 14: Software Architect (CloudSystems)
            (14, 'Stephen Strange', 'doctor@sanctum.com', 'https://magic.dev/cv', 'Master of the architectural arts and cloud systems.', '2024-05-10 18:00:00'),
            (14, 'Jean Grey', 'jean@xavier.edu', 'https://x-men.com/cv', 'Mind-reading user needs before they even ask.', '2024-05-10 18:00:00'),

            -- Job 15: Business Development Manager (GlobalTrade)
            (15, 'Steve Rogers', 'cap@avengers.com', 'https://stark.inc/cap', 'Leadership and business development since 1941.', '2024-05-10 18:00:00'),
            (15, 'Natasha Romanoff', 'nat@spy.net', 'https://blackwidow.dev/cv', 'Expert in covert business intelligence and global trade.', '2024-05-10 18:00:00'),

            -- Job 16: HR Manager (PeopleFirst)
            (16, 'Charles Xavier', 'charles@xavier.edu', 'https://schoolforgifted.com/cv', 'Managing unique people and their talents is my life work.', '2024-05-10 18:00:00'),
            (16, 'Logan Howlett', 'logan@x-men.com', 'https://weaponx.ca/cv', 'Im the best at what I do, and what I do is hiring.', '2024-05-10 18:00:00'),

            -- Job 17: Junior UX Researcher (UserCentric)
            (17, 'Miles Morales', 'miles@spiderverse.com', 'https://brooklyn.dev/cv', 'Fresh perspective on user research and qualitative data.', '2024-05-10 18:00:00'),
            (17, 'Gwen Stacy', 'gwen@spiderverse.com', 'https://ghost.spider/cv', 'Passionate about the intersection of music and UX.', '2024-05-10 18:00:00'),

            -- Job 18: Content Strategist (MediaMaven)
            (18, 'Matt Murdock', 'matt@nelsonandmurdock.com', 'https://hellskitchen.law/cv', 'Content strategy with a focus on legal and ethical clarity.', '2024-05-10 18:00:00'),
            (18, 'Frank Castle', 'punisher@vigilante.net', 'https://warzone.com/cv', 'Direct and high-impact content strategy execution.', '2024-05-10 18:00:00'),
            (18, 'Wade Wilson', 'deadpool@chimichanga.com', 'https://fourthwall.break/cv', 'Breaking the fourth wall through unconventional content.', '2024-05-10 18:00:00')
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
