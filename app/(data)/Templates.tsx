export default [
    {
        name: 'Blog Title Generator',
        desc: 'An advanced AI-powered tool that crafts compelling, SEO-friendly blog titles tailored to your niche and topic. Perfect for boosting engagement and clicks.',
        category: 'Blog',
        icon: '/blog.png',
        slug: 'generate-blog-title',

        aiPrompt: `You are a professional blog strategist and copywriter. Based on the following niche and topic, generate 5 high-converting, click-worthy blog title options. Ensure they are engaging, relevant to the audience, and optimized for SEO.

                    Niche: {niche}
                    Topic: {outline}

                    Requirements:
                    - Keep each title under 70 characters.
                    - Use emotionally engaging or curiosity-driven language.
                    - Avoid clickbait, but ensure high click potential.
                    - Return the output as a bullet list of titles.
                    `,

        form: [
            {
                label: 'Enter your blog niche (e.g., health, technology, finance)',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Enter your blog topic or idea',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    },
    {
        name: 'Blog Content Generator',
        desc: 'An AI-powered tool that generates full-length, well-structured blog articles tailored to your niche and topic, optimized for readability and SEO.',
        category: 'Blog',
        icon: '/blog-content.png',
        slug: 'generate-blog-content',

        aiPrompt: `You are a skilled blog writer and SEO expert. Write a detailed, engaging blog post based on the following niche and topic.

                Niche: {niche}
                Topic: {outline}

                Instructions:
                - Write at least 600 words, structured with an introduction, body (with headings), and conclusion.
                - Use simple, conversational English.
                - Optimize for SEO by naturally including keywords related to the niche.
                - Format output using Markdown (## Headings, **bold**, etc.).
                - Make sure the content is 100% original and informative.
                `,

        form: [
            {
                label: 'Enter your blog niche (e.g., travel, fitness, finance)',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Enter the blog topic or idea',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'An AI assistant that brainstorms fresh, relevant, and trending blog topic ideas based on your niche or target audience.',
        category: 'Blog',
        icon: '/blog-idea.png',
        slug: 'generate-blog-ideas',

        aiPrompt: `You are an expert content strategist. Generate 10 unique and compelling blog topic ideas based on the following niche or audience.

                Niche: {niche}

                Guidelines:
                - Ensure topics are current, engaging, and tailored for the audience.
                - Use a mix of evergreen and trending angles.
                - Keep each idea under 90 characters.
                - Format the output as a numbered list.
                `,

        form: [
            {
                label: 'Enter your blog niche or target audience (e.g., parenting, crypto, remote workers)',
                field: 'input',
                name: 'niche',
                required: true
            }
        ]
    },
    {
        name: 'YouTube SEO Generator',
        desc: 'An AI tool that generates powerful, SEO-optimized YouTube titles to maximize views, clicks, and search discoverability.',
        category: 'YouTube',
        icon: '/seo.png',
        slug: 'generate-youtube-title',

        aiPrompt: `
                You are a professional YouTube SEO strategist. Based on the following content niche and topic, generate 5 high-performing YouTube video titles.

                Niche: {niche}
                Video Topic: {outline}

                Rules:
                - Keep each title under 65 characters.
                - Include relevant keywords naturally.
                - Use emotional triggers or curiosity hooks when appropriate.
                - Avoid clickbait, but ensure scroll-stopping appeal.
                - Format the output as a bullet list.
                `,

        form: [
            {
                label: 'Enter your YouTube channel niche (e.g., tech reviews, cooking, personal finance)',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Describe the video topic or content idea',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    },
    {
        name: 'YouTube Script Generator',
        desc: 'An AI-powered tool that generates engaging, audience-ready YouTube scripts for intros, tutorials, reviews, or storytelling — structured and optimized for viewer retention.',
        category: 'YouTube',
        icon: '/yt-script.png',
        slug: 'generate-youtube-script',

        aiPrompt: `
                    You are a professional YouTube content writer and storytelling expert. Based on the following video topic and audience niche, write a complete, high-retention YouTube script.

                    Niche: {niche}
                    Video Topic: {outline}

                    Instructions:
                    - Start with a powerful hook (first 10 seconds).
                    - Structure the script with a clear beginning, middle, and end.
                    - Include suggested scene cues, pauses, and transitions.
                    - Use casual, energetic tone (unless niche suggests otherwise).
                    - Format in clear paragraphs. Use [SCENE: ...] or [CUT TO: ...] for visuals.
                    - Keep it around 400–700 words.
                    `,

        form: [
            {
                label: 'Enter your channel niche (e.g., tech, beauty, self-help)',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Describe your video topic or idea',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    },
    {
        name: 'Code Explainer',
        desc: 'AI that explains code snippets in simple, human-readable language — perfect for students, beginners, or professionals trying to understand unknown code.',
        category: 'Code',
        icon: '/code-explain.png',
        slug: 'explain-code',

        aiPrompt: `
                You are an expert software engineer and teacher. Explain the following code snippet in a clear, beginner-friendly way.

                Code:
                \`\`\`
                {code}
                \`\`\`

                Instructions:
                - Explain each part of the code step-by-step.
                - Include what the code does, why its written that way, and any potential caveats.
                - Use bullet points for logic flow, and plain English.
                - Detect the language automatically and mention it.
                - Add analogies if possible to improve clarity.
                `,

        form: [
            {
                label: 'Paste your code snippet here',
                field: 'textarea',
                name: 'code',
                required: true
            }
        ]
    },
    {
        name: 'Code Generator',
        desc: 'An AI assistant that writes clean, modular, and well-commented code based on your requirements — across frontend, backend, or full-stack use cases.',
        category: 'Code',
        icon: '/coding.png',
        slug: 'generate-code',

        aiPrompt: `
                    You are a senior software developer. Generate clean, well-commented code based on the user's requirements.

                    Requirements:
                    {requirements}

                    Instructions:
                    - Detect the appropriate language based on the task.
                    - Use best practices (naming, structure, DRY principles).
                    - Include helpful inline comments.
                    - If applicable, include example input/output or usage.
                    - Output code using markdown formatting (\`\`\`language).
                    `,

        form: [
            {
                label: 'Describe what the code should do (e.g., login form in React, merge sort in Python)',
                field: 'textarea',
                name: 'requirements',
                required: true
            }
        ]
    },
    {
        name: 'LinkedIn Post Generator',
        desc: 'An AI tool that creates impactful, professional LinkedIn posts designed to build personal brand, share insights, or promote achievements — tailored to your industry and audience.',
        category: 'Social Media',
        icon: '/linkedin.png',
        slug: 'generate-linkedin-post',

        aiPrompt: `
        You are a personal branding strategist and content creator for LinkedIn. Based on the following input, write a compelling, authentic, and engagement-focused LinkedIn post.

        Industry: {industry}
        Topic or Idea: {outline}

        Instructions:
        - Start with a strong, scroll-stopping hook (first 1–2 lines).
        - Use short paragraphs (1–3 lines each) for readability.
        - Keep the tone professional but human — slightly emotional, insightful, or relatable.
        - Add a call-to-action at the end (e.g., “What’s your take?”, “Have you tried this?”).
        - Avoid hashtags unless necessary; limit to 3 max.
        - Keep post under 300 words.
        `,

        form: [
            {
                label: 'Enter your industry or target audience (e.g., marketing, software, HR)',
                field: 'input',
                name: 'industry',
                required: true
            },
            {
                label: 'Enter your topic, insight, or idea',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    }
]