/* ============================================================================
   作品集数据文件 —— 网站上所有项目内容都从这里读取，改这里就等于改网站。

   加一个新项目：在 projects 数组里加一段 { ... }，顺序就是页面上的顺序。
     id          英文短名，用作网址（#id），只用小写字母、数字和连字符
     title       标题
     date        日期文字
     categories  筛选分类，可多个，取值见下面 categories 的 id
     summary     卡片上的一两句简介
     cover       封面：{ src: "assets/xxx.jpg", alt: "图片描述" }
                 或代码生成的图：{ fig: "trees", alt: "..." }
     featured    true 表示置顶高亮（只放一个）
     tags        （可选）["Data Visualization", ...]，显示成 #标签；置顶卡片和内容页顶部的 Tags 一栏都用它
     facts       （可选，置顶项目用）[["20", "concepts"], ...]
     url         没有内容页时，卡片跳转到的外部链接
     page        （可选）有它就会生成站内内容页，结构见 Lost in Translation
                 page.lede 标题下的一句话；page.meta 信息栏；page.description 信息栏下方的项目描述
                 约定：meta 里 Role 的每个词首字母大写，如 "Research, Design, Development"

   page.blocks 可用的内容块（有 label 的排成左标签右内容，没有的通栏）：
     { type: "text",   label, big: "大字引言", paragraphs: ["...", "..."] }   正文里 **加粗**
     { type: "steps",  label, items: [["小标题", "说明"], ...] }
     { type: "stats",  label, items: [["≈108°", "标题", "备注"], ...], paragraphs: [...] }
     { type: "list",   label, items: ["...", "..."] }
     { type: "mixed",  label, content: [ ... ] }   按顺序混排，content 里每项是下面之一：
                         { p: "一段文字" }  { ul: ["要点", ...] }
                         { img: { src, alt, caption } }           单张图
                         { imgs: [ { src, alt, caption }, ... ] } 多张图并排（三张就是三栏）
                         { h: "小节内的小标题" }  { big: "淡紫色大字引言" }
                         { video: { youtube: "视频ID", title, poster: "assets/封面.jpg" } }
                         { slot: "占位说明" }
     { type: "video",  youtube: "视频ID", title, poster }   通栏视频（部署到自己域名后直接播放，其他环境显示封面加链接）
     文字里可以写链接：[显示文字](https://...)
     page.links：描述下方的按钮，[["Try the demo", "https://..."], ...]
     { type: "refs",   label, items: ["Harris (1954)", ...] }
     { type: "image",  label, src: "assets/xxx.jpg", alt, caption }
     { type: "video",  label, src: "assets/xxx.mp4", caption }
     { type: "figure", fig: "csed", alt, caption }          代码生成的图
     { type: "slot",   label, text: "占位说明" }             还没有素材时的占位框
   ========================================================================== */
window.PORTFOLIO = {

  categories: [
    { id: "dataviz",     label: "Data Visualization",             short: "Data Visualization" },
    { id: "graphic",     label: "Graphic Design",                 short: "Graphic Design" },
    { id: "interaction", label: "Interaction & Game Development", short: "Interaction & Game Dev" }
  ],

  projects: [
    {
      id: "lost-in-translation",
      title: "Lost in Translation",
      date: "April 2026",
      categories: ["dataviz"],
      featured: true,
      tags: ["Data Visualization", "Critical AI Studies", "Computational Art", "Multilingual NLP"],
      summary: "A data visualization project measuring and rendering the cross-lingual semantic divergence of abstract social value concepts in AI embedding space as branching tree structures.",
      cover: { fig: "trees", alt: "Four generated trees, one per language: English, Chinese, Spanish and Russian" },
      page: {
        lede: "If you ask an AI what \"Freedom\" means in English, then ask again in Chinese—does it give the same answer?",
        meta: [
          ["Date", "April 2026"],
          ["Role", "Research, Design, Development"],
          ["Tools", "Python, OpenAI API, TouchDesigner"]
        ],
        description: "This project investigates whether AI semantic space is culturally neutral by measuring how the same abstract social value concept shifts when processed by a large language model across four languages: English, Chinese, Spanish, and Russian. Using cosine similarity analysis, angular displacement values are computed for each concept-language pair and mapped to L-System tree structures rendered in real time via TouchDesigner. The resulting forms make invisible computational differences in meaning visible as organic, branching geometries. The trees do not represent what these words mean to people; they represent what the model has learned to associate with them.",
        blocks: [
          { type: "image", src: "assets/lit-figure3.png",
            alt: "A white L-system tree on black. A thick vertical trunk with three labelled branches: Chinese and Spanish rise from the middle of the trunk, Russian leaves low and swings far out to the left",
            caption: "“Melancholy”: melancholy (English) · 忧郁 (Chinese) · Melancolía (Spanish) · Тоска (Russian)" },
          { type: "text", label: "Research Question",
            big: "When the same word is processed by a LLM in different languages, does it mean the same?",
            paragraphs: [
              "This project investigates a deceptively simple idea: that AI semantic space is not culturally neutral. Abstract social value concepts like \"Shame,\" \"Freedom,\" or \"Loyalty\" carry different cultural weights across languages, and when encoded by a large language model, the resulting high-dimensional vectors diverge in measurable ways. This divergence, which we term Cross-lingual Semantic Embedding Divergence, is not a technical error. It is a trace of whose language, whose texts, and whose conceptual frameworks were most present when the model learned to understand the world."
            ] },
          { type: "mixed", label: "Technical Solutions",
            content: [
              { p: "A four-stage pipeline links natural language input to real-time visual output:" },
              { ul: [
                "**Concept selection:** 20 abstract social value concepts, each translated into English, Chinese, Spanish, and Russian",
                "**Embedding extraction:** OpenAI text-embedding-3-small, called directly within TouchDesigner's Python environment",
                "**CSED computation:** cosine similarity between English and each language → converted to angular offset θ",
                "**L-System rendering:** θ drives branch angle; training data share (Common Crawl, log-normalized) drives branch thickness"
              ] },
              { img: { src: "assets/lit-figure1.png", alt: "Four-phase pipeline diagram: concept selection and translation, embedding extraction, cosine similarity to angle, L-System tree rendering" } }
            ] },
          { type: "mixed", label: "Findings",
            content: [
              { p: "The study measured CSED values for 20 concepts across three languages. Several patterns emerged." },
              { p: "Overall, Russian shows the highest average divergence (≈65.2°), followed by Chinese (≈55.6°), and Spanish the lowest (≈42.1°) — likely reflecting typological distance from English. Emotionally charged, introspective concepts consistently diverge more than institutional or behavioural ones." },
              { p: "Three data points stand out:" },
              { ul: [
                "**Тоска (Melancholy, Russian) — 108.10°** · A culturally untranslatable term for diffuse longing; nearly perpendicular to the English branch",
                "**羞耻 (Shame, Chinese) — 72.85°** · In Chinese cultural context, shame is collective and face-related rather than individual — a divergence that shows up clearly in the model's encoding",
                "**Obediencia (Obedience, Spanish) — 17.25°** · Shared Latin etymology with English produces near-perfect semantic alignment"
              ] },
              { imgs: [
                { src: "assets/lit-melancholy.png", alt: "L-system tree for melancholy", caption: "melancholy · 忧郁 · Melancolía · Тоска" },
                { src: "assets/lit-shame.png", alt: "L-system tree for shame", caption: "shame · 羞耻 · Vergüenza · Стыд" },
                { src: "assets/lit-obedience.png", alt: "L-system tree for obedience", caption: "obedience · 服从 · Obediencia · Послушание" }
              ] }
            ] },
          { type: "mixed", label: "Why it matters?",
            content: [
              { p: "AI semantic space is not a neutral map of human meaning; it is shaped by training data, reflecting whose language, whose texts, and whose cultural frameworks were most present when the model learned. This project makes that bias measurable and visible: the angular divergence between branches is not a technical error, but a geometric trace of how differently the same concept has been encoded across languages and cultures." }
            ] },
          { type: "list", label: "Next steps",
            items: [
              "Introduce color rendering to the tree structures: mapping the semantic attributes of each concept to a color palette, so that the visual output encodes not just divergence but also the affective register of the concept itself",
              "Expand the concept set to test whether the pattern of higher divergence in emotionally charged concepts holds more broadly",
              "Test alternative models trained on non-English-dominant corpora (e.g. DeepSeek) to observe how semantic divergence shifts when the dominant training language changes"
            ] },
          { type: "refs", label: "Reference",
            items: [
              "Vromen, E. (2024). Language Models as Semiotic Machines. arXiv:2410.13065",
              "Bateman, J. A. (2024). What are Large Language Models Doing? University of Helsinki Language Technology Seminar.",
              "Harris, Z. S. (1954). Distributional Structure. Word, 10(2–3), 146–162.",
              "Mikolov, T. et al. (2013). Efficient Estimation of Word Representations in Vector Space. arXiv:1301.3781"
            ] }
        ]
      }
    },
    {
      id: "woven-unknown",
      title: "Woven Unknown",
      date: "April 2026",
      categories: ["graphic"],
      summary: "An AI-generated video imagining a future where different AI systems come together as one collective intelligence.",
      cover: { src: "assets/woven.webp", alt: "A translucent jellyfish-like organism from the film Woven Unknown" },
      tags: ["AI-generated Video", "Speculative Design"],
      page: {
        lede: "What if the future is an ecosystem of intelligences that do not agree?",
        meta: [
          ["Date", "April 2026"],
          ["Role", "Research, Design, Development"],
          ["Tools", "Veo 3.1 (by Google)"]
        ],
        description: "This video imagines a world where distinct intelligences take the form of living organisms, each with its own morphology and behavior, drawn from three existing AI systems whose different natures become visible through how they move, sense, and connect. They share a substrate of geometric structure, growing across and through it, adapting as it shifts. No single intelligence dominates. The system is distributed, interdependent, and alive.",
        blocks: [
          { type: "video", youtube: "JxB6j0Q-IYQ", title: "Woven Unknown", poster: "assets/woven.webp" },
          { type: "mixed", label: "Reference",
            content: [
              { p: "Music: [HYbr: ID oval hadron II - alva noto](https://open.spotify.com/track/4vS8PHPhsvEm0TbforJtOk?si=bb1d6427e7994042)" }
            ] }
        ]
      }
    },
    {
      id: "semantic-collapse",
      title: "Semantic Collapse",
      date: "December 2025",
      categories: ["dataviz", "interaction"],
      summary: "An interactive web piece that maps the point where typographic order collapses into visual discomfort.",
      cover: { src: "assets/semantic.webp", alt: "Semantic Collapse interface with a repeated-sentence input and a 3D threshold chart" },
      tags: ["Data Visualization", "Typography", "Real-time Systems", "Critical Design"],
      page: {
        lede: "Where is the visual boundary for texts between a satisfying rhythm and a stressful noise?",
        meta: [
          ["Date", "Dec 2025"],
          ["Role", "Research, Design, Development"],
          ["Tools", "Socket.io, Plotly.js, Node.js"]
        ],
        description: "As an interactive web experiment for mapping the point where typographic order collapses into visual discomfort, this project explores semantic satiation - a psychological phenomenon where repetition transforms meaning into noise. Everyone can input some words, then adjust some parameters of the typographic orders to choose the most uncomfortable level for self. The web will show a real-time visualization of accumulated datas, recording a collective map of semantic satiation fear.",
        links: [["Try the demo", "https://alternative-machine.onrender.com/"]],
        blocks: [
          { type: "image", src: "assets/semantic.webp", alt: "Semantic Collapse interface: a repeated-sentence input beside a 3D chart of recorded thresholds" },
          { type: "mixed", label: "Inspiration - Fear of repetition of words",
            content: [
              { p: "**Semantic Satiation & the uncanny:** When a word is repeated too many times, even the most familiar text undergoes a transformation: it not only dissolves into meaninglessness but also evokes a sense of the uncanny, becoming strange, alien, and even visually disturbing." },
              { img: { src: "assets/sc-01.webp", alt: "A page of typewritten repeated sentences", caption: "The famous scene in The Shining - showing the semantic satiation" } },
              { h: "Design Goal" },
              { ul: [
                "Create real-time typographic visualization system",
                "Map three linguistic dimensions (repetition, density, distortion) to 3D space",
                "Enable collective data contribution through web interface",
                "Build entirely browser-based for accessibility"
              ] }
            ] },
          { type: "mixed", label: "Technical solutions",
            content: [
              { img: { src: "assets/sc-p1.webp", alt: "System diagram of the technical solution" } },
              { ul: [
                "**Real-time Sync**: Socket.io WebSocket connections for instant multi-user updates",
                "**3D Rendering**: Plotly.js with WebGL support for interactive terrain visualization",
                "**Sentiment Analysis**: sentiment library scoring text from -5 to +5",
                "**Deployment**: Render for server hosting and automatic scaling"
              ] }
            ] },
          { type: "mixed", label: "Development",
            content: [
              { h: "Parameter Design" },
              { big: "How do we measure the invisible boundary between comfort and chaos?" },
              { h: "Repetition - Volume of text" },
              { ul: ["Represents information overload", "The quantity that transforms meaning into noise", "Range determined by screen capacity testing"] },
              { img: { src: "assets/sc-p2.webp", alt: "Repetition parameter study" } },
              { h: "Density - Compression level" },
              { ul: ["Controls letter-spacing and line-height", "Simulates claustrophobia and visual crowding", "Percentage-based for intuitive control"] },
              { img: { src: "assets/sc-p3.webp", alt: "Density parameter study" } },
              { h: "Distortion - Chaos level" },
              { ul: ["Character-level transformation (skew, scale, displacement)", "Represents loss of readability and visual stability", "Mimics psychological disorientation"] },
              { img: { src: "assets/sc-p4.webp", alt: "Distortion parameter study" } },
              { h: "Visualization Evolution" },
              { p: "The visualization underwent three iterations to find the right metaphor for representing collective tolerance thresholds:" },
              { ul: [
                "Grid Wall: Too flat, failed to reveal patterns ❌",
                "2D Scatter Plot: Couldn’t represent third parameter (repetition) ❌",
                "3D Topographic Map: Repetition as elevation, plains = comfort, peaks = thresholds ✅"
              ] },
              { img: { src: "assets/sc-03.webp", alt: "Three iterations of the visualization" } }
            ] },
          { type: "mixed", label: "Different typographic effects",
            content: [
              { imgs: [
                { src: "assets/sc-test1.webp", alt: "Typographic effect test 1" },
                { src: "assets/sc-test2.webp", alt: "Typographic effect test 2" },
                { src: "assets/sc-test3.webp", alt: "Typographic effect test 3" },
                { src: "assets/sc-test4.webp", alt: "Typographic effect test 4" },
                { src: "assets/sc-test5.webp", alt: "Typographic effect test 5" },
                { src: "assets/sc-test6.webp", alt: "Typographic effect test 6" },
                { src: "assets/sc-test8.webp", alt: "Typographic effect test 8" },
                { src: "assets/sc-test9.webp", alt: "Typographic effect test 9" },
                { src: "assets/sc-test7.webp", alt: "Typographic effect test 7" }
              ] }
            ] },
          { type: "mixed", label: "Final Outputs",
            content: [
              { p: "**DEMO LINK** [https://alternative-machine.onrender.com/](https://alternative-machine.onrender.com/)" },
              { img: { src: "assets/semantic.webp", alt: "Final Semantic Collapse interface" } },
              { h: "Feedbacks" },
              { p: "I asked some of my classmates to test this demo. Although the sample amount is still not enough, I have some interesting observations." },
              { ul: [
                "Most people recorded the point at a high level distortion, including myself. However, one of my classmates Henry thought when every character is perfectly neat (distortion = 0%) , that is when it is most terrifying.",
                "Many people said the interface looks terrible on mobile (fair, since I didn't have time for responsive design at all), so they wanted to wait and do it on their computer later. But for me, any delay in sample collection kills the response rate. This made me realize how critical mobile adaptation is for web-based interactive prototypes, even when the project itself isn't primarily targeting mobile users."
              ] }
            ] },
          { type: "list", label: "Next steps",
            items: [
              "Convert current relative axes to absolute coordinate values",
              "Adjust visualization layout to prevent 3D canvas from blocking the sample detail panel",
              "Continue data collection for research credibility—target 50-100 samples",
              "Implement responsive design for mobile",
              "Consider adding serif/sans-serif toggle to typography controls"
            ] },
          { type: "refs", label: "References",
            items: [
              "[Socket.io Documentation](https://socket.io/docs/v4/)",
              "[Plotly.js Documentation](https://plotly.com/javascript/)",
              "[Semantic Satiation (Wikipedia)](https://en.wikipedia.org/wiki/Semantic_satiation)"
            ] }
        ]
      }
    },
    {
      id: "panopticon",
      title: "The Gaze Panopticon",
      date: "December 2025",
      categories: ["interaction"],
      summary: "An interactive reversal of Foucault’s Panopticon. Real-time face detection turns surveillance into the collective power that ruptures the prison.",
      cover: { src: "assets/panopticon.webp", alt: "3D scenes from The Gaze Panopticon" },
      tags: ["Interactive Installation", "Speculative Design", "Creative Coding"],
      page: {
        lede: "Can the gaze be turned into a collective power?",
        meta: [
          ["Date", "Dec 2025"],
          ["Role", "Concept, Design, Development"],
          ["Tools", "3D Graphics, Real-time System, Face Detection"]
        ],
        description: "This interactive installation reimagines Foucault’s Panopticon through a radical reversal: the confined self transforms external surveillance into collective power. Audiences join via a shared web link where real-time face detection tracks their attention. Each gaze is measured by duration and multiplied by the number of watchers, accumulating as tangible pressure on the confined self. As collective observation intensifies, the self channels this force to shatter the prison structure, taking us to a place where what was designed to control becomes the catalyst for liberation.",
        links: [
          ["Join the gaze here", "https://the-gaze-panopticon.onrender.com/audience.html"],
          ["Try the feeling of being gazed", "https://the-gaze-panopticon.onrender.com/index.html"]
        ],
        blocks: [
          { type: "video", youtube: "zipeStioaus", title: "The gaze panopticon", poster: "assets/panopticon.webp" },
          { type: "mixed", label: "Concept",
            content: [
              { p: "One person (the Experiencer) navigates a 3D space where they're confined within a digital Panopticon alongside a representation of their \"Self.\" Multiple Audience members watch through their screens, and their facial attention is tracked in real-time using computer vision." },
              { p: "As collective observation intensifies, pressure accumulates - the Panopticon structure begins to shake, the Self deforms under stress. When pressure reaches critical mass, the prison structure shatters, and the Self transforms into a luminous, free-floating form." }
            ] },
          { type: "list", label: "Design Goals",
            items: [
              "Create real-time networked interaction between 1 experiencer and multiple audience members",
              "Use facial detection to quantify attention as measurable force",
              "Visualize abstract concepts (pressure, surveillance) through 3D spatial experience",
              "Build entirely web-based for accessibility—no app downloads required"
            ] },
          { type: "mixed", label: "Technical Architecture",
            content: [
              { p: "Built with Three.js, Socket.io, face-api.js — entirely web-based, no installation required." },
              { img: { src: "assets/gp-arch.webp", alt: "System architecture diagram" } },
              { ul: [
                "**Face Detection**: face-api.js tracks attention duration in real-time",
                "**3D Morphing**: Blender shape keys → Three.js morph targets (pressure 0→100)",
                "**WebSockets**: Socket.io synchronizes state across all connected clients",
                "**Particles**: ~5K-10K vertices explode with radial velocity at rupture"
              ] }
            ] },
          { type: "mixed", label: "Development",
            content: [
              { h: "Phase 1 - Basic 3D modeling" },
              { p: "I created the geometry of the basic object (Self) and the scene (Panopticon) in Blender, then using shape keys to define its deformation states. Three.js then controls these morph targets in real-time based on accumulated gaze pressure." },
              { img: { src: "assets/gp-morph.webp", alt: "The Self blob morphing between its base and deformed shapes", caption: "Interpolation: 0.0 (base shape) → 1.0 (fully deformed)" } },
              { h: "Phase 2 - Importing the 3D model in Three.js" },
              { p: "To make the Self deform based on accumulated gaze pressure, I created an updateBlobMorph() function that maps pressure (0-100) to the shape key value (0.0-1.0)." },
              { ul: [
                "At pressure = 0 → morphTargets [0] = 0.0 → blob stays in base form",
                "At pressure = 50 → morphTargets [0] = 0.5 → blob is 50% deformed",
                "At pressure = 100 → morphTargets [0] = 1.0 → blob is fully compressed"
              ] },
              { h: "Phase 3 - Use face detection to collect the gaze" },
              { p: "The most challenging aspect was implementing reliable face detection in the browser. This required three complete attempts before finding a working solution." },
              { p: "**1st try - MediaPipe Face Mesh** The failed reason: Google's MediaPipe model promised 468 facial landmarks with high accuracy. However, it relied on WebAssembly (WASM) binaries that failed to initialize." },
              { p: "**2nd try - TensorFlow.js Face Landmarks** I pivoted to TensorFlow.js, which uses pure JavaScript/WebGL instead of WASM. Model loaded successfully, camera feed worked; but detection consistently returned 0 faces." },
              { p: "**3rd try - face-api.js** Finally, I found success with the vladmandic fork of face-api.js. It’s a more stable, better-maintained version with simpler API." },
              { h: "Phase 4 - Building the Real-Time Communication System" },
              { p: "To synchronize state across multiple users, I built a Node.js server using Socket.io. The server maintains a centralized gameState and broadcasts updates to all connected clients." },
              { p: "**Gaze Event Handling** Face detection on the client emits three events: gaze-start, gaze-hold (every 100ms), and gaze-end. The server accumulates pressure accordingly." },
              { ul: ["Timing: 1 person gazing continuously = ~2 pressure/sec → 50 seconds to reach rupture (100)"] },
              { h: "Phase 5 - More visual details" },
              { p: "Each phase required distinct visual language to communicate psychological states. I implemented dynamic materials, particle systems, and animations responding to accumulated pressure." },
              { p: "**Waiting / Stable (0-30 pressure)**" },
              { ul: ["Pristine metallic form", "Subtle gray glow", "Shape keys begin deforming"] },
              { p: "**Critical (30-70 pressure)**" },
              { ul: ["Red/yellow flashing (20Hz)", "Shake effects intensify", "Visual tension builds"] },
              { imgs: [
                { src: "assets/gp-stable.webp", alt: "Stable state: metallic form with a gray glow", caption: "Waiting / Stable" },
                { src: "assets/gp-critical.webp", alt: "Critical state: red and yellow flashing", caption: "Critical" }
              ] },
              { p: "**Rupture (70-100 pressure)**" },
              { ul: ["Structure explodes", "~5K particles with radial velocity", "Cyan/magenta color gradient"] },
              { p: "**Transmutation (Manual trigger)**" },
              { ul: ["Self resets, high roughness", "Zero metalness, emission 3.0", "Gentle floating animation"] },
              { img: { src: "assets/gp-rupture.webp", alt: "The structure exploding into particles, then the Self floating free", caption: "Rupture & Transmutation" } }
            ] },
          { type: "mixed", label: "Demo & Reflection",
            content: [
              { p: "**Join the gaze**: [https://the-gaze-panopticon.onrender.com/audience.html](https://the-gaze-panopticon.onrender.com/audience.html)" },
              { p: "**Want to be gazed?**: [https://the-gaze-panopticon.onrender.com/index.html](https://the-gaze-panopticon.onrender.com/index.html)" },
              { h: "Effect Video" },
              { video: { youtube: "zipeStioaus", title: "The gaze panopticon", poster: "assets/panopticon.webp" } },
              { p: "This project intentionally uses the tools of surveillance to imagine their opposite, like cameras, algorithms, quantified attention. This contradiction remains unresolved. But perhaps that's the point: transformation doesn't come from perfect solutions, but from the willingness to question the structures we inhabit." },
              { p: "The work reveals its own limitations. You watch through screens, mediated by the very tools of digital surveillance we live under. The face detection that enables \"liberation\" is the same technology used for mass surveillance in authoritarian states. But perhaps this liminal space, which between constraint and freedom, between complicity and resistance, is exactly where transformation begins." }
            ] },
          { type: "list", label: "Next step",
            items: [
              "Better user experience: responsive design for mobile and tablets",
              "WebXR integration: may introduce VR/AR mode for a more immersive experience",
              "Session persistence: Database storage of game states and histories"
            ] },
          { type: "refs", label: "References",
            items: [
              "[Three.js Documentation](https://threejs.org/docs/)",
              "[Socket.io Documentation](https://socket.io/docs/v4/)",
              "[face-api.js GitHub](https://github.com/vladmandic/face-api)",
              "[WebGL Fundamentals](https://webglfundamentals.org/)"
            ] }
        ]
      }
    },
    {
      id: "wonderland",
      title: "Wonderland",
      date: "March – July 2024",
      categories: ["interaction"],
      summary: "Turns private dreams into shared visual artifacts through wearable sensing and AI: a collaborative platform between artists and dreamers.",
      cover: { src: "assets/wonderland.jpg", alt: "Wonderland sleep mask and mobile app screens" },
      tags: ["User Experience", "Data Visualization", "Hardware", "3D Modeling"],
      page: {
        lede: "A dream-sharing platform connecting dreamers with artists",
        meta: [
          ["Date", "March 2024 - July 2024"],
          ["Role", "Research, Concept, Design"],
          ["Tools", "Figma, Blender, DALL-E API"]
        ],
        description: "Wonderland is a dream-sharing platform that bridges the gap between dreamers and artists seeking authentic creative inspiration.\n\n**Problem** Artists often struggle to find genuine, emotionally-rich source material for their work. Meanwhile, millions of dreams filled with unique imagery and narratives, are easily forgotten within minutes of waking.\n\n**Solution** A mobile app paired with a sleep mask that captures dream patterns through eye movement tracking, transforms them into searchable visual symbols using AI, and connects dreamers with artists in a collaborative community.",
        blocks: [
          { type: "image", src: "assets/wonderland.jpg", alt: "Wonderland sleep mask and mobile app screens" },
          { type: "mixed", label: "Research",
            content: [
              { p: "**Question: Why DREAMS are important to creativity?** Dreams, filled with randomness and emotional metaphors, inspire many artists and result in numerous artworks. They offer more than just chaotic fragments, often holding profound emotions and metaphors." },
              { p: "Methodology: Desk Research" },
              { img: { src: "assets/wl-p101.webp", alt: "Desk research on dreams and creativity" } },
              { p: "**Question: Can dreams be a steady source of inspiration for creators?** Many people enjoy recording their dreams and are open to others drawing inspiration from them. People also provide logical considerations that can be used as criteria to categorize various dreams." },
              { p: "Methodology: Co-Discovery Workshop · 3 Hours, 6 Participants" },
              { img: { src: "assets/wl-p201.webp", alt: "Co-discovery workshop" } },
              { img: { src: "assets/wl-w22.webp", alt: "Workshop outputs" } }
            ] },
          { type: "mixed", label: "Insights",
            content: [
              { img: { src: "assets/wl-w23.webp", alt: "Research insights" } },
              { big: "How might we connect the needs of dream recorders with artists looking for inspiration from dreams?" }
            ] },
          { type: "mixed", label: "Ideation",
            content: [
              { h: "Persona & Needs analysis" },
              { img: { src: "assets/wl-w24.webp", alt: "Persona and needs analysis" } },
              { h: "Design Concept" },
              { img: { src: "assets/wl-p205.webp", alt: "Design concept" } },
              { img: { src: "assets/wl-p206.webp", alt: "Design concept detail" } }
            ] },
          { type: "mixed", label: "Technical Features",
            content: [
              { p: "Wonderland consists of two main components: a sleep mask that captures dreams and an AI model that visualizes them. The sleep mask uses LiDAR sensors to monitor eye movements and detect REM sleep, while the DALL-E AI model generates visual representations of dreams based on various characteristics." },
              { h: "LiDAR Sensors Array - Capture Dreams" },
              { img: { src: "assets/wl-w31.webp", alt: "LiDAR sensor array in the sleep mask" } },
              { h: "DALL-E AI Model - Visualize Dreams" },
              { p: "The DALL-E AI model generates customizable moon symbols based on dream characteristics. By adjusting parameters like emotion intensity, color spectrum, logic degree, and detail richness, each dream transforms into a unique visual representation—ranging from delicate crescents to textured full moons—capturing the emotional and narrative essence of the dreamer's experience." },
              { img: { src: "assets/wl-p302.webp", alt: "Generated moon symbols for different dream parameters" } }
            ] },
          { type: "mixed", label: "Design",
            content: [
              { p: "There are five main sections in Wonderland: recording dreams, browsing other's dreams, creation based on other's dreams, my own dream space, and notifications." },
              { h: "Information Architecture" },
              { img: { src: "assets/wl-p304.webp", alt: "Information architecture" } },
              { h: "Wireframes" },
              { img: { src: "assets/wl-p303.webp", alt: "Wireframes" } }
            ] },
          { type: "mixed", label: "Final Effects",
            content: [
              { p: "By using a LIDAR sensors array, the movement of the cornea under the eyelid can be measured without the sensor touching the eye, thus monitoring whether a person is dreaming." },
              { img: { src: "assets/wl-p402.webp", alt: "Sleep mask render" } },
              { img: { src: "assets/wl-p401.webp", alt: "Sleep mask render, second view" } },
              { h: "Hi-Fi (selected)" },
              { imgs: [
                { src: "assets/wl-f852.webp", alt: "Main page screen", caption: "Main Page" },
                { src: "assets/wl-f853.webp", alt: "My Dream Galaxy screen", caption: "My Dream Galaxy" },
                { src: "assets/wl-f854.webp", alt: "Dream labeling screen", caption: "Dream Labeling" },
                { src: "assets/wl-f855.webp", alt: "Dream details screen", caption: "Dream Details" },
                { src: "assets/wl-f856.webp", alt: "Creation screen", caption: "Creation" }
              ] },
              { h: "User Flows" },
              { p: "*The character images in this part were generated with the assistance of AIGC tools." },
              { img: { src: "assets/wl-p404.webp", alt: "User flow for dream recorders", caption: "Dream Recorders" } },
              { img: { src: "assets/wl-p405.webp", alt: "User flow for artists", caption: "Artists" } }
            ] }
        ]
      }
    },
    {
      id: "tolerate-it",
      title: "Tolerate It?",
      date: "July – October 2024",
      categories: ["interaction"],
      summary: "An interactive installation linking our growing tolerance for life’s hardships with our growing tolerance for caffeine.",
      cover: { src: "assets/tolerate.jpg", alt: "Tolerate It? performance stills and generated rings" },
      tags: ["Interactive Installation", "Performance", "Hardware", "ECG Sensors"],
      page: {
        lede: "Metaphorically connecting the increasing tolerance for both life's hardships and caffeine",
        meta: [
          ["Date", "July 2024 - October 2024"],
          ["Role", "Concept, Design, Development"],
          ["Tools", "Arduino, Processing"]
        ],
        description: "Tolerate it? is an interactive installation that metaphorically connects the increasing tolerance for both life's hardships and caffeine. By utilizing Arduino for real-time ECG readings and Processing for visualization, the installation intuitively reflects the performer's stress levels. Through this work, I aim to convey that enduring suffering doesn't guarantee success or happiness but instead fosters tolerance, potentially leading to an unhealthy state.",
        blocks: [
          { type: "video", youtube: "ynhN1gsm8b0", title: "Installation Art | Tolerate it?", poster: "assets/tolerate.jpg" },
          { type: "mixed", label: "Research",
            content: [
              { h: "Growing Caffeine Dependence" },
              { p: "**Methodology**" },
              { ul: ["Desk Research", "Questionnaire, N = 117"] },
              { p: "After beginning work, coffee has played an increasingly vital role in my life. Initially, it was simply a straightforward tool for me to stay alert, but now, having coffee has become a natural habit in my life, as ordinary as breathing. It has subtly integrated into my daily routine, becoming a part of my existence." },
              { img: { src: "assets/ti-p101.webp", alt: "Personal coffee consumption record", caption: "I Become a Coffee Enthusiast" } },
              { img: { src: "assets/ti-p102.webp", alt: "Questionnaire results on coffee habits", caption: "Am I an Exception?" } },
              { h: "The Correlation Between Hardship and Coffee" },
              { p: "Suffering is merely suffering; it is we humans who have always endowed it with other meanings. Enduring pain does not necessarily lead to success, but it will certainly increase our tolerance, allowing us to bear more and more pain. However, such a process is both meaningless and lamentable." },
              { h: "The Mechanism of Caffeine" },
              { imgs: [
                { src: "assets/ti-p201.webp", alt: "Adenosine receptors in a normal state", caption: "Normally..." },
                { src: "assets/ti-p202.webp", alt: "Receptors after drinking coffee", caption: "Once Drinking Coffee..." },
                { src: "assets/ti-p203.webp", alt: "Receptors after long-term caffeine intake", caption: "After Long-term Caffeine Intake..." }
              ] },
              { h: "Self-Motivation Analysis" },
              { p: "Initially, I couldn't stand the bitterness of coffee. But as I faced academic and work challenges, I often imagined that I could overcome the difficulties just as I had learned to tolerate the taste of coffee. Gradually, I came to see the bitterness of coffee as an inevitable part of the journey towards success and happiness." },
              { img: { src: "assets/ti-p204.webp", alt: "Self-motivation analysis diagram" } },
              { p: "**What Happens When One's Tolerance for Suffering Increases?** Persistent uncontrollable negative events lead to a sense of powerlessness and resignation, creating a negative psychological loop, potentially harming health." },
              { img: { src: "assets/ti-p205.webp", alt: "Learned helplessness loop", caption: "**Learned helplessness** - a maladaptive adaptation to the tolerance of suffering." } },
              { imgs: [
                { src: "assets/ti-p206.webp", alt: "Imagined relationship between suffering and success", caption: "In people’s imagination..." },
                { src: "assets/ti-p207.webp", alt: "Actual relationship between suffering and tolerance", caption: "But the fact is..." }
              ] }
            ] },
          { type: "mixed", label: "Design",
            content: [
              { p: "**Installation Concept** The performer controls the infusion of coffee liquid into silicone tubes covering the body at three different flow rates, symbolizing the gradual development of caffeine tolerance. During each infusion, the performer passively endures the disruptive blare of alarms, while their ECG fluctuates from intense spikes to eventual stability—representing the increasing resilience to life's hardships." },
              { img: { src: "assets/ti-p301.webp", alt: "Installation concept sketch" } },
              { h: "Hardware Setting" },
              { img: { src: "assets/ti-p302.webp", alt: "Circuit diagram", caption: "Circuit Diagram of the ECG Sensor" } },
              { h: "Software Setting (coding)" },
              { slot: "Code embed from the original page: link or snippet to add" },
              { h: "Visual Effects Sample" },
              { imgs: [
                { src: "assets/ti-fx12.webp", alt: "Low stress visual", caption: "**Low stress** - Most of the points are green, with clear and steady trajectories." },
                { src: "assets/ti-fx13.webp", alt: "Medium stress visual", caption: "**Medium stress** - Yellow and red points appear, with fluctuating trajectories and unstable cycles." },
                { src: "assets/ti-fx14.webp", alt: "High stress visual", caption: "**High stress** - Many red points with fluctuating, unstable trajectories form a petal-like pattern." }
              ] }
            ] },
          { type: "mixed", label: "Final Effect",
            content: [
              { imgs: [
                { src: "assets/ti-p501.webp", alt: "Performance still 1" },
                { src: "assets/ti-p502.webp", alt: "Performance still 2" }
              ] },
              { p: "Initially, the performer activates the pump, symbolizing caffeine intake as coffee flows through the tubing. An alarm sounds, which represents the hardships encountered in life, and the performer's heart rate spikes with discomfort. In subsequent interactions, rising coffee concentration indicates growing caffeine tolerance. Despite a more urgent alarm, the performer's expression and heart rate stabilize, showing adaptation to life's hardships." },
              { img: { src: "assets/ti-p503.webp", alt: "Installation overview" } },
              { p: "See the full video here:" },
              { video: { youtube: "ynhN1gsm8b0", title: "Installation Art | Tolerate it?", poster: "assets/tolerate.jpg" } }
            ] }
        ]
      }
    }
  ],

  /* About 页。resume 是网站自己文件夹里的 PDF，换新简历时替换 assets 里的文件并改这里的文件名。 */
  about: {
    title: "About Me",
    paragraphs: [
      "I'm a designer, researcher, and creative technologist based in Los Angeles. Previously working in UX research and product strategy in Shanghai, I’m currently pursuing an MFA in Media Design Practices at ArtCenter.",
      "My work explores how AI systems process cultural ambiguity in language, and how such processing in turn shapes human cognition and meaning-making."
    ],
    resume: "assets/Resume-Han-Zhang-June2026.pdf",
    links: [
      ["Email", "gracehan2333@gmail.com", "mailto:gracehan2333@gmail.com"],
      ["LinkedIn", "hanzhang233", "https://www.linkedin.com/in/hanzhang233/"],
      ["Instagram", "kaleidomoon_", "https://www.instagram.com/kaleidomoon_/"],
      ["YouTube", "@Hanzhang9898", "https://www.youtube.com/@Hanzhang9898"],
      ["CV", "Google Drive", "https://drive.google.com/file/d/1u9sFXPboTunCVJJ-xxqgWHxT9-m8XxUn/view?usp=sharing"]
    ]
  },

  /* Experiments 页：按组排列。soon: true 会显示 “Coming soon”。 */
  experiments: [
    { title: "Coding", items: [
      { title: "Rube Goldberg machine", note: "API fetch practice", cover: { src: "assets/x-www.webp", alt: "Rube Goldberg machine web page" } },
      { title: "Counting machine", note: "Computational audio analysis", cover: { src: "assets/x-counting.webp", alt: "Counting machine terminal output" } },
      { title: "Digital Materialities", note: "Shader coding practice", cover: { src: "assets/x-shader.webp", alt: "Pixelated shader studies in green and pink" } },
      { title: "Text as material", note: "Probabilistic text generation practice", cover: { src: "assets/x-mirror.jpg", alt: "Magic Mirror text generator" } },
      { title: "Define bisexual", note: "Critical research with a prototype", cover: { src: "assets/x-bisexual.jpg", alt: "Dress-up game result screen" } }
    ] },
    { title: "Product & Service", items: [
      { title: "Fluid Drift", note: "Service design", soon: true, cover: { src: "assets/x-fluid.jpg", alt: "Fluid Drift wearable" } },
      { title: "Sizzle Dialogue", note: "UX design", soon: true, cover: { src: "assets/x-sizzle.jpg", alt: "Sizzle Dialogue cards and app screens" } }
    ] }
  ]
};
