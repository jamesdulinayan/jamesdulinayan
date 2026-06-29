/**
 * James Dulinayan - Persistent AI Chatbot Assistant
 * Persists seamlessly across pages using Barba.js DOM stability.
 */

(function () {
  "use strict";

  // Prevent multiple initializations
  if (document.getElementById('ai-chat-widget')) return;

  // Configuration & Portfolio Data for Context-Aware Answers
  const PORTFOLIO_DATA = {
    name: "James Dulinayan",
    role: "Creative Digital Developer & Designer",
    skills: {
      development: ["HTML/CSS/JS", "React", "Next.js", "WordPress", "GSAP & ScrollTrigger Animations", "Responsive Design", "PHP", "jQuery", "SEO Optimization"],
      design: ["UI/UX Design", "Graphic Design", "Motion Graphics", "Branding & Identity", "Adobe Photoshop & Illustrator", "Figma", "Lottie Animations"],
      video: ["Video Editing", "VFX & Compositing", "Color Grading", "Social Media Ads", "Premiere Pro", "After Effects", "DaVinci Resolve"]
    },
    contact: {
      email: "james.dulinayan@gmail.com",
      phone: "+63 956 362 0905",
      linkedin: "https://www.linkedin.com/in/jamesdulinayan/",
      instagram: "https://www.instagram.com/jamesdulinayan/",
      facebook: "https://www.facebook.com/jamesdulinayan/"
    },
    about: "James is a versatile digital creator specializing in building immersive web experiences, crafting beautiful designs, and editing impactful videos. He blends technical development with artistic vision."
  };

  // Response builders used by suggested pills and keyword matching
  function getBackgroundResponse() {
    return `James Dulinayan is a ${PORTFOLIO_DATA.role} based in the Philippines.<br><br>
            He is passionate about bridging the gap between elegant aesthetics and functional, clean code. Whether it is building interactive web experiences or editing cinematic video narratives, he focuses on delivering visual excellence.<br><br>
            Read his full background and story on the <a href="/about" target="_blank">About Page</a>.`;
  }

  function getSkillsResponse() {
    return `James specializes in crafting high-end digital experiences across three core disciplines:<br><br>
            • Web Development & Design: building responsive, interactive, and SEO-optimized sites using <em>${PORTFOLIO_DATA.skills.development.slice(0, 4).join(", ")}</em>, and custom WordPress animations.<br><br>
            • Graphic & Motion Design: custom UI/UX, branding identities, and smooth motion graphics.<br><br>
            • Video Editing: high-performance post-production, cinematic editing, and color grading.<br><br>
            You can view all his technical skills on the <a href="/about" target="_blank">About Page</a> or view live projects on the <a href="/projects" target="_blank">Projects Page</a>.`;
  }

  function getProjectsResponse() {
    const projectsList = [
      { name: "Summit Collective", url: "/projects/summit-collective.html", cat: "Web Development", desc: "High-performance agency site" },
      { name: "fleur.", url: "/projects/fleur.html", cat: "Web Development", desc: "Premium front-end layout" },
      { name: "A.B.E Group", url: "/projects/abe-group.html", cat: "Web Development & Design", desc: "Engineering product showcase" },
      { name: "Caliz Music Studio", url: "/projects/caliz-music-studio.html", cat: "Web Development", desc: "Music school landing page" },
      { name: "enuf-proj", url: "/projects/enuf-proj.html", cat: "Graphic Design", desc: "Branding & art direction" },
      { name: "Kapampangan Folk", url: "/projects/kapampangan-folk.html", cat: "Graphic Design", desc: "Digital illustration" },
      { name: "Ad Infinitum", url: "/projects/ad-infinitum.html", cat: "Motion Graphics", desc: "Motion graphic visual" },
      { name: "Kaleidoscope", url: "/projects/kaleidoscope.html", cat: "Video Editing", desc: "Cinematic narrative edits" }
    ];

    const shuffled = projectsList.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    let projectHtml = "James has worked on several exciting projects. Here is a selection from his portfolio:<br><br>";
    selected.forEach(p => {
      projectHtml += `• <a href="${p.url}" target="_blank">${p.name}</a> (${p.cat}) - <em>${p.desc}</em><br>`;
    });
    projectHtml += `<br>Explore the interactive layout of all his works on the <a href="/projects.html" target="_blank">Projects Page</a>.`;

    return projectHtml;
  }

  function getContactResponse() {
    return `I can help you connect with James. Here are the best ways to get in touch:<br><br>
            • Email: <a href="mailto:${PORTFOLIO_DATA.contact.email}" target="_blank">${PORTFOLIO_DATA.contact.email}</a><br>
            • Phone/WhatsApp: <a href="tel:${PORTFOLIO_DATA.contact.phone}" target="_blank">${PORTFOLIO_DATA.contact.phone}</a><br>
            • LinkedIn: <a href="${PORTFOLIO_DATA.contact.linkedin}" target="_blank">linkedin.com/in/jamesdulinayan</a><br><br>
            You can also check his dedicated <a href="/contact" target="_blank">Contact Page</a>.`;
  }

  function getPricingResponse() {
    return `James customizes every project based on its unique scope, timeline, and complexity to deliver optimal value.<br><br>
            To get a customized quote for your project (whether it is web development, graphic design, or video editing), please reach out directly with details via the <a href="/contact" target="_blank">Contact Page</a> or drop an email to <a href="mailto:${PORTFOLIO_DATA.contact.email}" target="_blank">${PORTFOLIO_DATA.contact.email}</a>.`;
  }

  function getProcessResponse() {
    return `James follows a structured 4-step creative process to ensure project success:<br><br>
            1. Discovery: aligning on project goals, design directions, and technical requirements.<br>
            2. Design & Prototype: creating wireframes and mockups (in Figma/Adobe) to lock in the visual aesthetic.<br>
            3. Development: writing clean, responsive code and integrating animations.<br>
            4. Launch & Review: thorough quality assurance, speed optimization, and final deployment.`;
  }

  const SUGGESTED_QUERY_RESPONSES = {
    "what's his background?": getBackgroundResponse,
    "what are his skills?": getSkillsResponse,
    "show me some projects": getProjectsResponse,
    "how do i get in touch?": getContactResponse,
    "how does pricing work?": getPricingResponse,
    "what's his process?": getProcessResponse
  };

  // Helper to generate context-aware mock AI responses
  function getAIResponse(userMessage) {
    const msg = userMessage.toLowerCase().trim();

    if (SUGGESTED_QUERY_RESPONSES[msg]) {
      return SUGGESTED_QUERY_RESPONSES[msg]();
    }

    // About the assistant
    if (msg.includes("who are you") || msg.match(/\bwho is this\b/) || msg.includes("your name")) {
      return `I'm James' AI assistant — a custom helper built for this portfolio. I can answer questions about his work, skills, projects, rates, and how to get in touch. What would you like to know?`;
    }
 
    if (msg.includes("what can you help") || msg.includes("what can you do") || msg.includes("how can you help") || msg.match(/\b(help|guide|options|commands|menu|features)\b/)) {
      return `I can help you explore James' portfolio and find what you need:<br><br>
              • Learn about his skills and services<br>
              • Browse featured projects<br>
              • Understand his process and rates<br>
              • Get contact details or link you to the contact form<br><br>
              Just ask, or tap one of the suggestions below.`;
    }
 
    // Quick greetings
    if (msg.match(/\b(hi|hello|hey|greetings|hola|yo|good morning|good afternoon|good evening|sup|what's up)\b/)) {
      return "Hello! I'm James' AI assistant. I can help you learn about his work, skills, and projects, or point you to the best way to get in touch. What would you like to explore?";
    }    // Project-Specific Queries
    if (msg.includes("summit") || msg.includes("collective")) {
      return `<strong>Summit Collective</strong> is a premium, high-performance digital agency website.<br><br>
              • <strong>Role:</strong> Web Development & GSAP Animations<br>
              • <strong>Tech Stack:</strong> Next.js, React, GSAP (GreenSock), ScrollTrigger<br>
              • <strong>Details:</strong> Features extremely smooth animations, page transitions, and a highly responsive grid layout.<br><br>
              Explore the <a href="/projects/summit-collective.html" target="_blank">Summit Collective Project</a>.`;
    }

    if (msg.includes("fleur")) {
      return `<strong>fleur.</strong> is a high-end front-end web layout showcase.<br><br>
              • <strong>Role:</strong> Creative Front-End Development<br>
              • <strong>Tech Stack:</strong> HTML, CSS, JavaScript, ScrollTrigger Animations<br>
              • <strong>Details:</strong> Focused on layout aesthetics, high-end editorial typography, and interactive hover details.<br><br>
              Explore the <a href="/projects/fleur.html" target="_blank">fleur. Project</a>.`;
    }

    if (msg.includes("abe") || msg.includes("a.b.e")) {
      return `<strong>A.B.E Group</strong> is a product showcase site built for an engineering group.<br><br>
              • <strong>Role:</strong> WordPress Development & Custom Styling<br>
              • <strong>Tech Stack:</strong> WordPress, Elementor, Custom CSS<br>
              • <strong>Details:</strong> Designed to display mechanical systems and structural products clean and professionally.<br><br>
              Explore the <a href="/projects/abe-group.html" target="_blank">A.B.E Group Project</a>.`;
    }

    if (msg.includes("caliz") || msg.includes("music studio") || msg.includes("music-studio")) {
      return `<strong>Caliz Music Studio</strong> is a web landing page for a premium music academy.<br><br>
              • <strong>Role:</strong> Web Development & Design<br>
              • <strong>Tech Stack:</strong> WordPress, Custom Themes<br>
              • <strong>Details:</strong> Focuses on engaging layout aesthetics and seamless navigation to book courses and view classes.<br><br>
              Explore the <a href="/projects/caliz-music-studio.html" target="_blank">Caliz Music Studio Project</a>.`;
    }

    if (msg.includes("enuf")) {
      return `<strong>enuf-proj</strong> is a branding and graphic design case study.<br><br>
              • <strong>Role:</strong> Graphic Design & Art Direction<br>
              • <strong>Details:</strong> Represents minimalist packaging designs, curated brand guidelines, and visual communication materials.<br><br>
              Explore the <a href="/projects/enuf-proj.html" target="_blank">enuf-proj Project</a>.`;
    }

    if (msg.includes("kapampangan") || msg.includes("folk")) {
      return `<strong>Kapampangan Folk</strong> is a digital illustration and culture project.<br><br>
              • <strong>Role:</strong> Digital Illustration & Layout<br>
              • <strong>Details:</strong> A series of illustrated posters celebrating Kapampangan cultural identity, folklore, and local heritage.<br><br>
              Explore the <a href="/projects/kapampangan-folk.html" target="_blank">Kapampangan Folk Project</a>.`;
    }

    if (msg.includes("infinitum") || msg.includes("ad-infinitum")) {
      return `<strong>Ad Infinitum</strong> is a high-energy motion design showcase.<br><br>
              • <strong>Role:</strong> Motion Graphic Design & Animation<br>
              • <strong>Tech Stack:</strong> Adobe After Effects, Illustrator<br>
              • <strong>Details:</strong> Merges graphic patterns with kinetic typography and audio sync for a stylized motion video.<br><br>
              Explore the <a href="/projects/ad-infinitum.html" target="_blank">Ad Infinitum Project</a>.`;
    }

    if (msg.includes("kaleidoscope") || msg.includes("kaleid")) {
      return `<strong>Kaleidoscope</strong> is a cinematic narrative video editing showcase.<br><br>
              • <strong>Role:</strong> Video Editing & Sound Design<br>
              • <strong>Tech Stack:</strong> Adobe Premiere Pro, DaVinci Resolve, Audition<br>
              • <strong>Details:</strong> An emphasis on color grading, audio post-production, seamless pacing, and narrative storytelling.<br><br>
              Explore the <a href="/projects/kaleidoscope.html" target="_blank">Kaleidoscope Project</a>.`;
    }
    if (msg.includes("hauwak") || msg.includes("kamay")) {
      return `<strong>Hauwak Kamay</strong> is a digital graphic design and brand illustration project.<br><br>
              • <strong>Role:</strong> Graphic Design & Illustration<br>
              • <strong>Details:</strong> Celebrating local community values and cultural storytelling through custom vector art styles.<br><br>
              Explore the <a href="/projects/hauwak-kamay.html" target="_blank">Hauwak Kamay Project</a>.`;
    }

    if (msg.includes("ivy") || msg.includes("league")) {
      return `<strong>Ivy League</strong> is a premium collegiate-themed landing page layout.<br><br>
              • <strong>Role:</strong> Web Design & Front-End Development<br>
              • <strong>Tech Stack:</strong> HTML, CSS, JavaScript, ScrollTrigger Animations<br>
              • <strong>Details:</strong> Clean grid structures, high-end typography, and subtle scroll indicators.<br><br>
              Explore the <a href="/projects/ivy-league.html" target="_blank">Ivy League Project</a>.`;
    }

    if (msg.includes("lqf") || msg.includes("clinic")) {
      return `<strong>LQF Clinic</strong> is a custom development project for a medical clinic client.<br><br>
              • <strong>Role:</strong> Web Development & Design<br>
              • <strong>Tech Stack:</strong> WordPress, Custom Styling<br>
              • <strong>Details:</strong> Responsive design designed for medical clients, enabling patient information access and services display.<br><br>
              Explore the <a href="/projects/lqfclinic.html" target="_blank">LQF Clinic Project</a>.`;
    }

    if (msg.includes("ocean")) {
      return `<strong>The Ocean Project</strong> is an interactive web showcase highlighting conservation.<br><br>
              • <strong>Role:</strong> Front-End Development & UI Design<br>
              • <strong>Details:</strong> Parallax scrolling and smooth transitions showcasing underwater ecology and conservation awareness.<br><br>
              Explore the <a href="/projects/the-ocean-project.html" target="_blank">The Ocean Project Page</a>.`;
    }

    if (msg.includes("wreck")) {
      return `<strong>Wreck-It Hau</strong> is a playful student-centric gaming event website.<br><br>
              • <strong>Role:</strong> Web Development & Event Branding<br>
              • <strong>Tech Stack:</strong> HTML, CSS, JavaScript, Custom Animations<br>
              • <strong>Details:</strong> An interactive site built for an IT student event at Holy Angel University, featuring retro arcade aesthetics.<br><br>
              Explore the <a href="/projects/wreck-it-hau.html" target="_blank">Wreck-It Hau Project</a>.`;
    }

 
    // Specific WordPress queries
    if (msg.includes("wordpress") || msg.includes("elementor") || msg.match(/\bwp\b/)) {
      return `James is highly experienced in WordPress Development. Custom, high-performance themes, customized product showcases, and page speed optimization are a core focus. He uses Elementor, custom CSS, and GSAP animations to make WordPress sites feel custom and premium, not generic.<br><br>
              Key WordPress Projects:<br>
              • <a href="/projects/abe-group.html" target="_blank">A.B.E Group</a> (Engineering product showcase)<br>
              • <a href="/projects/caliz-music-studio.html" target="_blank">Caliz Music Studio</a> (Music school landing page)`;
    }
 
    // Specific React / Next.js queries
    if (msg.includes("react") || msg.includes("next") || msg.includes("nextjs") || msg.includes("frontend") || msg.includes("front-end")) {
      return `For interactive and complex web applications, James uses React and Next.js combined with modern animation libraries like GSAP (GreenSock). This allows him to create Single Page Application (SPA) experiences with high-performance routing and dynamic state management.<br><br>
              Key Front-End Projects:<br>
              • <a href="/projects/summit-collective.html" target="_blank">Summit Collective</a> (High-performance agency site)<br>
              • <a href="/projects/fleur.html" target="_blank">fleur.</a> (Premium front-end layout)`;
    }
 
    // Specific Animation queries
    if (msg.includes("animation") || msg.includes("animate") || msg.includes("gsap") || msg.includes("scrolltrigger") || msg.includes("motion")) {
      return `James specializes in micro-animations and ScrollTrigger transitions. Using GSAP (GreenSock) and LottieFiles, he creates interactive visual storytelling on websites, making user interaction feel responsive, playful, and alive. Check out the draggable folder layouts on his <a href="/" target="_blank">Home</a> and <a href="/404" target="_blank">404</a> pages!<br><br>
              Key Animated Sites:<br>
              • <a href="/projects/summit-collective.html" target="_blank">Summit Collective</a> (GSAP transitions)<br>
              • <a href="/projects/fleur.html" target="_blank">fleur.</a> (Custom scroll triggers)`;
    }
 
    // Specific Video Editing / Premiere / After Effects queries
    if (msg.includes("video") || msg.includes("edit") || msg.includes("premiere") || msg.includes("after effects") || msg.includes("davinci") || msg.includes("vfx") || msg.includes("grading")) {
      return `James has a deep background in Video Editing and Post-Production:<br><br>
              • Cinematic Cuts & Pacing: Adobe Premiere Pro & DaVinci Resolve.<br>
              • VFX & Motion Design: Adobe After Effects.<br>
              • Audio & Sound Design: Adobe Audition.<br><br>
              His edits focus on clean cuts, color grading, sound design, and kinetic typography.<br><br>
              Key Video Projects:<br>
              • <a href="/projects/kaleidoscope.html" target="_blank">Kaleidoscope</a> (Cinematic narrative edits)<br>
              • Explore other video works on the <a href="/projects.html" target="_blank">Projects Page</a>.`;
    }
 
    // Specific Graphic Design / Figma / UI UX queries
    if (msg.includes("design") || msg.includes("graphic") || msg.includes("figma") || msg.includes("photoshop") || msg.includes("illustrat") || msg.includes("ui") || msg.includes("ux")) {
      return `James handles the end-to-end creative lifecycle. His Design Skills include:<br><br>
              • UI/UX Design: prototyping interactive layouts in Figma/Adobe XD.<br>
              • Brand & Identity: logo design, guidelines, typography, and illustration.<br>
              • Marketing Assets: print layouts, social media ads, and YouTube thumbnails.<br><br>
              Key Design Projects:<br>
              • <a href="/projects/enuf-proj.html" target="_blank">enuf-proj</a> (Branding & art direction)<br>
              • <a href="/projects/kapampangan-folk.html" target="_blank">Kapampangan Folk</a> (Digital illustration)<br>
              • <a href="/projects/ad-infinitum.html" target="_blank">Ad Infinitum</a> (Motion graphic visual)`;
    }
 
    // Contact Info
    if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("hire") || msg.includes("call") || msg.includes("reach") || msg.includes("touch") || msg.includes("message") || msg.includes("mail") || msg.includes("social")) {
      return getContactResponse();
    }
 
    // Pricing / Rates / Services (before skills to avoid "work" false matches)
    if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost") || msg.includes("rate") || msg.includes("charge") || msg.includes("fee") || msg.includes("budget") || msg.includes("payment") || msg.includes("pay")) {
      return getPricingResponse();
    }
 
    // Skills & services
    if (msg.includes("skill") || msg.includes("offer") || msg.includes("service") || msg.includes("technology") || msg.includes("technologies") || msg.includes("tech") || msg.includes("code") || msg.includes("expert") || msg.includes("abilit")) {
      return getSkillsResponse();
    }
 
    // About James / background
    if (msg.includes("who is") || msg.includes("about") || msg.includes("james") || msg.includes("background") || msg.includes("experience") || msg.includes("bio") || msg.includes("history")) {
      return getBackgroundResponse();
    }
 
    // Projects / Works
    if (msg.includes("project") || msg.includes("portfolio") || msg.includes("example") || msg.includes("showcase") || msg.includes("website") || msg.match(/\bworks?\b/)) {
      return getProjectsResponse();
    }
 
    // Workflow / Process / How do you work
    if (msg.includes("process") || msg.includes("workflow") || msg.includes("how do you work") || msg.includes("step") || msg.includes("collaborat")) {
      return getProcessResponse();
    }
 
    // Availability / Freelance / Job
    if (msg.includes("availab") || msg.includes("freelance") || msg.includes("hire") || msg.includes("contract") || msg.includes("full time") || msg.includes("job")) {
      return `James is currently available for select freelance projects, contract opportunities, and collaborations.<br><br>
              If you have an interesting project or a role you'd like to discuss, feel free to get in touch on <a href="${PORTFOLIO_DATA.contact.linkedin}" target="_blank">LinkedIn</a> or send a request through the <a href="/contact" target="_blank">Contact Page</a>.`;
    }
 
    // Resume / CV / Career Summary
    if (msg.match(/\b(resume|cv|history|career|employment|experience|work|shoreagents|filam|job|intern|internship)\b/)) {
      return `James Dulinayan is a Web Developer & Designer with 4+ years of professional experience:<br><br>
              • <strong>Web Developer & Designer</strong> @ <strong>ShoreAgents Inc.</strong> (Sept 2022 – Feb 2026)<br>
              Developed responsive WordPress websites and landing pages using Elementor, custom PHP, and CSS based on Figma designs. Built custom plugins, optimized site performance/Core Web Vitals, and managed server/hosting deployments.<br><br>
              • <strong>Web Developer Intern</strong> @ <strong>FilAm Software Technology Inc.</strong> (Sept 2021 – Dec 2021)<br>
              Supported client website development using WordPress and GravCMS based on UI/UX design requirements.<br><br>
              You can view his full credentials on the <a href="/about" target="_blank">About Page</a> or drop a line to <a href="mailto:${PORTFOLIO_DATA.contact.email}">${PORTFOLIO_DATA.contact.email}</a> to request his official CV document.`;
    }

    // Education / Degree / College
    if (msg.match(/\b(education|college|university|school|degree|study|studied|graduat|holy angel|hau|bsit)\b/)) {
      return `James graduated with a <strong>Bachelor of Science in Information Technology (BSIT)</strong> from <strong>Holy Angel University</strong> (June 2018 – June 2022).`;
    }
 
    // Location
    if (msg.includes("location") || msg.includes("where") || msg.includes("live") || msg.includes("country") || msg.includes("based")) {
      return `James is based in the Philippines and works with clients globally. Remote collaborations are fully supported and seamlessly managed across different time zones.`;
    }

    // WooCommerce / E-Commerce
    if (msg.includes("ecommerce") || msg.includes("e-commerce") || msg.includes("shop") || msg.includes("store") || msg.includes("woocommerce") || msg.includes("cart") || msg.includes("checkout")) {
      return `James develops fully customized e-commerce solutions using WordPress, WooCommerce, and custom checkout flows. He ensures your store is optimized for speed, fully responsive, and styled to match your unique brand identity instead of using generic templates.`;
    }

    // Social Handles / Channels / Links
    if (msg.includes("social") || msg.includes("instagram") || msg.includes("facebook") || msg.includes("linkedin") || msg.includes("profile") || msg.includes("handle") || msg.includes("link")) {
      return `You can find and follow James across his professional and creative social media channels:<br><br>
              • LinkedIn: <a href="${PORTFOLIO_DATA.contact.linkedin}" target="_blank">LinkedIn Profile</a><br>
              • Instagram: <a href="${PORTFOLIO_DATA.contact.instagram}" target="_blank">Instagram Profile</a><br>
              • Facebook: <a href="${PORTFOLIO_DATA.contact.facebook}" target="_blank">Facebook Page</a>`;
    }

    // Software & Tools (Figma, Photoshop, etc.)
    if (msg.includes("tool") || msg.includes("software") || msg.includes("figma") || msg.includes("photoshop") || msg.includes("illustrator") || msg.includes("premiere") || msg.includes("after effects") || msg.includes("davinci") || msg.includes("lottie")) {
      return `James is proficient with industry-standard creative tools, including:<br><br>
              • Design & UI/UX: Figma, Adobe Photoshop, Adobe Illustrator, Adobe XD, LottieFiles.<br>
              • Video & Sound: Adobe Premiere Pro, Adobe After Effects, Adobe Audition, DaVinci Resolve.`;
    }
 
    // Easter Egg / About the Chatbot
    if (msg.includes("bot") || msg.includes("chatbot") || msg.includes("who created") || msg.includes("who made")) {
      return `I am a custom-designed, persistent helper built specifically for James Dulinayan's portfolio website to assist visitors like you.`;
    }

    // Small Talk: How are you
    if (msg.includes("how are you") || msg.includes("how is it going") || msg.includes("how's it going") || msg.includes("are you ok")) {
      return `I'm doing great, thank you! I'm ready to help you explore James' portfolio. How can I assist you today?`;
    }

    // Gratitude / Polite closings
    if (msg.match(/\b(thanks|thank you|awesome|perfect|cool|great|nice|ty)\b/)) {
      return `You're very welcome! Let me know if there's anything else I can help you find.`;
    }

    if (msg.match(/\b(bye|goodbye|see you|adios|exit)\b/)) {
      return `Goodbye! Thank you for visiting. Feel free to open me back up if you have any more questions!`;
    }

    // SEO & Website Optimization
    if (msg.match(/\b(seo|performance|speed|caching|optimization|lazy load|core web vitals|analytics|ranking|gtmetrix|pagespeed)\b/)) {
      return `James specializes in website speed and SEO optimization. During his time at ShoreAgents, he dramatically improved Core Web Vitals using advanced caching, lazy loading, asset minification, and image optimization techniques. Every site he builds is structured with SEO best practices in mind.`;
    }

    // Hobbies / Personal Info
    if (msg.match(/\b(hobby|hobbies|interest|free time|fun|like to do|creative|personal)\b/)) {
      return `Beyond development and design, James is passionate about visual storytelling, editing video content, exploring modern design concepts, and keeping up with the latest web technologies and creative media trends.`;
    }

    // Age / Identity details
    if (msg.match(/\b(age|old|how old|birthday|born)\b/)) {
      return `James is a digital professional who graduated college in 2022 and has been working in the creative dev space for over 4 years.`;
    }

    // Timelines & Duration
    if (msg.match(/\b(timeline|duration|how long|timeframe|days|weeks|month)\b/)) {
      return `Project timelines vary depending on scope: simple landing pages can take 1–2 weeks, while custom WordPress projects or complex React web apps usually take 3–6 weeks. Contact James directly to discuss your project's timeline!`;
    }

    // Git & GitHub
    if (msg.includes("git") || msg.includes("github") || msg.includes("version control") || msg.includes("repo")) {
      return `James uses Git and GitHub for version control, ensuring all web development projects have safe backup histories, clear change tracking, and streamlined production deployments.`;
    }

    // AI Integration & Coding workflows
    if (msg.match(/\b(ai|artificial intelligence|claude|chatgpt|gemini|cursor|copilot|prompt)\b/)) {
      return `James actively integrates AI-assisted development tools (such as Claude, Cursor AI, and Google Gemini) into his coding and debugging workflows to accelerate plugin development, script writing, and troubleshooting.`;
    }

    // CMS & GravCMS
    if (msg.match(/\b(cms|grav|gravcms|headless)\b/)) {
      return `While WordPress is James' primary CMS platform, he also has experience with flat-file content management systems like GravCMS (which he used to build and support client sites during his internship at FilAm).`;
    }

    // Server, hosting, DNS, domains
    if (msg.match(/\b(deploy|host|server|domain|dns|cpanel|setup|launch|dns configuration|nameserver)\b/)) {
      return `James is fully comfortable managing the launch cycle of websites: setting up server environments, linking domains, editing DNS records, and launching production releases securely.`;
    }

    // QA and Testing
    if (msg.match(/\b(test|qa|quality assurance|safari|chrome|firefox|mobile friendly|responsive check|bug|debug|cross-browser)\b/)) {
      return `Every website James builds undergoes rigorous cross-browser and cross-device QA testing to ensure that layouts, visual styles, and complex GSAP animation effects work smoothly across Chrome, Safari, Firefox, iOS, and Android.`;
    }

    // Agile & Team collaboration
    if (msg.match(/\b(agile|scrum|team|sprint|standup|jira|trello|collaborat)\b/)) {
      return `James has strong experience working in Agile team environments (collaborating closely with UI/UX designers, marketers, and developers on scheduled sprints and tasks to deliver projects successfully).`;
    }

    // Help or default
    return "I'm James' AI assistant — ask me about his portfolio, skills, rates, or how to reach him.";
  }

  // Initialize Chatbot when DOM is ready
  function initChatbot() {
    // Double check to prevent recreation
    if (document.getElementById('ai-chat-widget')) return;

    // Create Widget Container
    const widget = document.createElement('div');
    widget.id = 'ai-chat-widget';

    // Check previous open state; do not auto-open on first load of session
    const hasSession = sessionStorage.getItem('ai_chat_open') !== null;
    const isOpen = hasSession ? sessionStorage.getItem('ai_chat_open') === 'true' : false;
    if (isOpen) {
      widget.classList.add('is-open');
    }

    // Inject HTML Structure
    widget.innerHTML = `
      <div class="chat-window">
        <div class="chat-header">
          <div class="chat-avatar">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div class="chat-header-info">
            <h4 class="chat-header-title">James' Assistant</h4>
            <span class="chat-header-status">Online</span>
          </div>
          <button class="chat-clear-btn" title="Clear Conversation">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div class="chat-messages" id="chat-messages-container"></div>
        <div class="chat-input-area">
          <input type="text" class="chat-input" placeholder="Ask a question..." aria-label="Type your message">
          <button class="chat-send-btn" aria-label="Send message">
            <i class="fa-solid fa-paper-plane chat-send-icon" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="chat-suggestions">
        <button class="chat-suggest-btn" data-query="What's his background?">What's his background?</button>
        <button class="chat-suggest-btn" data-query="What are his skills?">What are his skills?</button>
        <button class="chat-suggest-btn" data-query="Show me some projects">Show me some projects</button>
        <button class="chat-suggest-btn" data-query="How do I get in touch?">How do I get in touch?</button>
        <button class="chat-suggest-btn" data-query="How does pricing work?">How does pricing work?</button>
        <button class="chat-suggest-btn" data-query="What's his process?">What's his process?</button>
      </div>
      <button class="chat-toggle-btn" aria-label="Toggle Chatbot">
        <i class="fa-solid fa-message chat-icon-message"></i>
        <i class="fa-solid fa-xmark chat-icon-close"></i>
        <span class="chat-badge" style="display: none;">1</span>
      </button>
    `;

    // Append to body (outside Barba container) so it stays persistent
    document.body.appendChild(widget);

    // DOM Elements
    const toggleBtn = widget.querySelector('.chat-toggle-btn');
    const clearBtn = widget.querySelector('.chat-clear-btn');
    const input = widget.querySelector('.chat-input');
    const sendBtn = widget.querySelector('.chat-send-btn');
    const messagesContainer = widget.querySelector('#chat-messages-container');
    const badge = widget.querySelector('.chat-badge');

    let chatHistory = [];

    // Load Chat History from LocalStorage
    function loadHistory() {
      const stored = localStorage.getItem('ai_chat_history');
      if (stored) {
        try {
          chatHistory = JSON.parse(stored);
        } catch (e) {
          chatHistory = [];
        }
      }

      // If no history, add greeting message
      if (chatHistory.length === 0) {
        chatHistory.push({
          sender: 'bot',
          text: "Hey! I'm James' AI assistant. Ask me about his work, projects, rates, or how to get in touch.",
          time: new Date().getTime()
        });
        saveHistory();
      }

      renderMessages(true, true);
    }

    // Save Chat History to LocalStorage
    function saveHistory() {
      localStorage.setItem('ai_chat_history', JSON.stringify(chatHistory));
    }

    // Update active suggestion chips visibility based on history
    function updateSuggestionChips(immediate = false) {
      const userMessages = chatHistory.filter(m => m.sender === 'user').map(m => m.text.toLowerCase().trim());
      widget.querySelectorAll('.chat-suggest-btn').forEach(btn => {
        const query = btn.getAttribute('data-query').toLowerCase().trim();
        if (userMessages.includes(query)) {
          btn.classList.add('is-hidden');
          if (immediate) {
            btn.style.display = 'none';
          } else {
            // Wait for collapse transition (200ms) to complete before setting display: none
            setTimeout(() => {
              if (btn.classList.contains('is-hidden')) {
                btn.style.display = 'none';
              }
            }, 200);
          }
        } else {
          btn.style.display = '';
          btn.classList.remove('is-hidden');
        }
      });
    }

    // Render messages to DOM
    function renderMessages(immediateSuggestions = false, animateIn = false) {
      messagesContainer.innerHTML = '';
      chatHistory.forEach((msg, index) => {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${msg.sender}`;
        bubble.innerHTML = msg.text;
        messagesContainer.appendChild(bubble);
        if (animateIn) {
          // Stagger slide-up intro matching suggestion pill animation
          const delay = index * 70;
          setTimeout(() => {
            bubble.classList.add('bubble-visible');
          }, delay);
        } else {
          // Show immediately, no animation
          bubble.classList.add('bubble-visible');
        }
      });
      scrollToBottom();
      updateSuggestionChips(immediateSuggestions);
    }

    // Auto-scroll to bottom of messages
    function scrollToBottom() {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Show Typing Indicator
    function showTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'chat-bubble bot typing-indicator-bubble bubble-visible';
      indicator.innerHTML = `
        <div class="chat-typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      messagesContainer.appendChild(indicator);
      scrollToBottom();
      return indicator;
    }

    // Send message action
    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      // Add User Message
      chatHistory.push({
        sender: 'user',
        text: text,
        time: new Date().getTime()
      });
      input.value = '';
      renderMessages();
      saveHistory();

      // Show typing indicator
      const indicator = showTypingIndicator();

      // Simulate bot delay
      setTimeout(() => {
        // Remove typing indicator
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }

        // Get and add bot response
        const response = getAIResponse(text);
        chatHistory.push({
          sender: 'bot',
          text: response,
          time: new Date().getTime()
        });
        renderMessages();
        saveHistory();

        // If widget is closed, notify user with badge
        if (!widget.classList.contains('is-open')) {
          badge.style.display = 'flex';
        }
      }, 1000 + Math.random() * 500);
    }

    // Event Listeners
    const iconMsg = toggleBtn.querySelector('.chat-icon-message');
    const iconClose = toggleBtn.querySelector('.chat-icon-close');

    const ANIM_OPTS = { duration: 400, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' };

    function animateIconsOpen() {
      iconMsg.animate([
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' }
      ], ANIM_OPTS);
      iconClose.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
      ], ANIM_OPTS);
    }

    function animateIconsClosed() {
      iconMsg.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
      ], ANIM_OPTS);
      iconClose.animate([
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' }
      ], ANIM_OPTS);
    }

    toggleBtn.addEventListener('click', () => {
      const isCurrentlyOpen = widget.classList.toggle('is-open');
      sessionStorage.setItem('ai_chat_open', isCurrentlyOpen);
      if (isCurrentlyOpen) {
        animateIconsOpen();
        badge.style.display = 'none';
        setTimeout(scrollToBottom, 50);
        // Stagger-animate suggestion chips in, one by one
        const chips = [...widget.querySelectorAll('.chat-suggest-btn:not([style*="display: none"])')].filter(b => !b.classList.contains('is-hidden'));
        chips.forEach((chip, i) => {
          chip.classList.remove('is-visible');
          setTimeout(() => chip.classList.add('is-visible'), 120 + i * 80);
        });
      } else {
        animateIconsClosed();
        // Reset chip animations with reverse stagger so they animate out sequentially
        const chips = [...widget.querySelectorAll('.chat-suggest-btn')].filter(b => !b.classList.contains('is-hidden'));
        // reverse order for exit animation
        chips.slice().reverse().forEach((chip, i) => {
          setTimeout(() => chip.classList.remove('is-visible'), i * 80);
        });
      }
    });

    clearBtn.addEventListener('click', () => {
      chatHistory = [];
      localStorage.removeItem('ai_chat_history');
      loadHistory();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    // Drag-to-scroll logic for suggestions on desktop
    const suggestions = widget.querySelector('.chat-suggestions');
    let isDown = false;
    let startX;
    let scrollLeft;
    let hasDragged = false;

    suggestions.addEventListener('mousedown', (e) => {
      isDown = true;
      hasDragged = false;
      suggestions.classList.add('active-drag');
      startX = e.pageX - suggestions.offsetLeft;
      scrollLeft = suggestions.scrollLeft;
    });

    suggestions.addEventListener('mouseleave', () => {
      isDown = false;
      suggestions.classList.remove('active-drag');
    });

    suggestions.addEventListener('mouseup', () => {
      isDown = false;
      suggestions.classList.remove('active-drag');
    });

    suggestions.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - suggestions.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(x - startX) > 5) {
        hasDragged = true;
      }
      suggestions.scrollLeft = scrollLeft - walk;
    });

    suggestions.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        suggestions.scrollLeft += e.deltaY;
      }
    });

    // Event Listeners for suggestion chips
    widget.querySelectorAll('.chat-suggest-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          return;
        }
        // Use same exit animation as menu: remove visibility class
        btn.classList.remove('is-visible');
        // After transition, hide and send the query
        setTimeout(() => {
          btn.classList.add('is-hidden'); // keep layout tidy
          const query = btn.getAttribute('data-query');
          input.value = query;
          sendMessage();
        }, 800); // matches 0.75s transition + buffer
      });
    });

    sendBtn.addEventListener('click', sendMessage);

    // If user clicks a link inside the chat window, set state to closed for the target page
    widget.querySelector('.chat-window').addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        sessionStorage.setItem('ai_chat_open', 'false');
      }
    });

    // Initial Load
    loadHistory();

    // If chat was already open from sessionStorage, animate chips in on load
    if (isOpen) {
      setTimeout(() => {
        const chips = [...widget.querySelectorAll('.chat-suggest-btn:not([style*="display: none"])')].filter(b => !b.classList.contains('is-hidden'));
        chips.forEach((chip, i) => {
          setTimeout(() => chip.classList.add('is-visible'), 120 + i * 80);
        });
      }, 400); // slight delay so window open animation plays first
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
