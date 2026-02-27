import type { Locale, ResumeContent } from '@/types/resume';

export const resumeContent: Record<Locale, ResumeContent> = {
  ru: {
    navigation: [
      { id: 'about', label: 'О себе' },
      { id: 'skills', label: 'Навыки' },
      { id: 'experience', label: 'Опыт' },
      { id: 'education', label: 'Образование' },
      { id: 'contacts', label: 'Контакты' },
    ],
    ui: {
      language: 'Язык',
      theme: 'Тема',
      light: 'Светлая',
      dark: 'Темная',
    },
    hero: {
      name: 'Yosin Nurov',
      role: 'Middle Front-end Developer',
      location: 'Dushanbe, Tajikistan',
      summary:
        'Frontend-разработчик с сильной экспертизой в JavaScript, TypeScript, React и React Native. Проектирую быстрые, масштабируемые и поддерживаемые продукты с фокусом на UX, производительность и инженерное качество.',
      actions: [
        {
          label: 'Связаться по Email',
          href: 'mailto:yosinnurov2007@gmail.com',
          kind: 'primary',
        },
        {
          label: 'Скачать резюме (PDF)',
          href: '/Yosin_Nurov_Resume.pdf',
          kind: 'secondary',
          download: true,
        },
      ],
      stats: [
        { value: '2+ года', label: 'Коммерческий опыт' },
        { value: 'React + TS', label: 'Ключевой стек' },
        { value: 'Web / Mobile / 3D', label: 'Кросс-доменная разработка' },
      ],
    },
    about: {
      title: 'Профиль',
      paragraphs: [
        'Совмещаю инженерный подход с продуктовым мышлением: строю интерфейсы, которые выглядят современно, работают быстро и остаются удобными для дальнейшего развития.',
        'Есть опыт фриланса, преподавания и прямой коммуникации с заказчиками. Умею переводить сложные технические решения в понятный язык бизнеса и пользователей.',
      ],
    },
    skills: {
      title: 'Технологии и компетенции',
      groups: [
        {
          title: 'Frontend',
          items: [
            'HTML5',
            'CSS3',
            'SASS / SCSS',
            'JavaScript (ES6+)',
            'TypeScript',
            'React',
            'React Native',
            'Three.js',
          ],
        },
        {
          title: 'Backend',
          items: [
            'Node.js',
            'Express.js',
            'Fastify',
            'REST API',
            'Интеграция внешних сервисов',
          ],
        },
        {
          title: 'Инженерные практики',
          items: [
            'UI/UX',
            'Адаптивная и кросс-браузерная верстка',
            'Оптимизация производительности',
            'Чистый и поддерживаемый код',
            'Agile / Scrum',
          ],
        },
        {
          title: 'Инструменты',
          items: [
            'Git',
            'GitHub',
            'Figma',
            'Photoshop',
            'Graphic Design',
          ],
        },
      ],
    },
    experience: {
      title: 'Опыт работы',
      items: [
        {
          role: 'Freelance Frontend / Full-Stack Developer',
          company: 'Self-employed',
          location: 'Dushanbe',
          period: 'Янв 2025 — настоящее время',
          bullets: [
            'Разрабатываю современные web-приложения на React, JavaScript и TypeScript.',
            'Создаю кроссплатформенные мобильные приложения на React Native.',
            'Проектирую backend-сервисы на Node.js (Express, Fastify) и REST API.',
            'Интегрирую интерактивные 3D-сцены и визуализации на Three.js.',
            'Работаю напрямую с клиентами: сбор требований, оценка, релиз и поддержка.',
          ],
        },
        {
          role: 'Front-end Developer',
          company: 'Babilon',
          location: 'Dushanbe',
          period: 'Янв 2024 — Июл 2024',
          bullets: [
            'Развивал и поддерживал продуктовые приложения на React, JavaScript и TypeScript.',
            'Реализовывал адаптивные интерфейсы на HTML5 и CSS3 с упором на UX.',
            'Интегрировал frontend с REST API и внутренними сервисами компании.',
            'Улучшал производительность интерфейсов и скорость рендеринга страниц.',
            'Участвовал в командной поставке внутренних и клиентских проектов.',
          ],
        },
        {
          role: 'Lecturer',
          company: 'Korvoni Umed',
          location: 'Dushanbe',
          period: 'Период не указан',
          bullets: [
            'Преподавал HTML, CSS и JavaScript от базовых тем до продвинутых практик.',
            'Объяснял современный JavaScript: ES6+, async/await, API integration.',
            'Проводил практические занятия по React и архитектуре интерфейсов.',
            'Готовил учебные материалы, задания и итоговые тесты.',
            'Проводил code review и техническое менторство студентов.',
          ],
        },
        {
          role: 'Guest Frontend Instructor (2-Day Intensive)',
          company: 'Alif Academy',
          location: 'Dushanbe',
          period: '2-дневный интенсив',
          bullets: [
            'Провел интенсив по HTML, CSS и JavaScript для начинающих разработчиков.',
            'Разобрал DOM-манипуляции и современные возможности ES6+.',
            'Сопровождал практические coding-сессии и давал технический фидбек.',
            'Вводил студентов в основы frontend-архитектуры и инженерных подходов.',
          ],
        },
      ],
    },
    education: {
      title: 'Образование',
      items: [
        {
          degree: 'Bachelor (в процессе) — Applied Informatics',
          institution: 'Russian-Tajik Slavonic University (RTSU), Dushanbe',
          period: 'С 2025',
          details: ['Факультет естественных наук, прикладная информатика.'],
        },
        {
          degree: 'Computer Science and Programming',
          institution: 'Alif Academy',
          period: '2023',
          details: ['Курс завершен с отличием.'],
        },
        {
          degree: 'Secondary Art Education',
          institution: 'Aminzoda Art School, Dushanbe',
          period: '2014 — 2024',
          details: ['Художественная база усилила визуальное мышление в UI/UX.'],
        },
      ],
    },
    languages: {
      title: 'Языки',
      items: ['Русский', 'Английский', 'Таджикский', 'Японский'],
    },
    interests: {
      title: 'Интересы',
      items: [
        'Графический дизайн и digital-иллюстрация',
        'Музыка: фортепиано, гитара, скрипка',
        'Спорт: баскетбол, волейбол, велоспорт',
        'Чтение художественной и научной литературы',
      ],
    },
    contact: {
      title: 'Контакты',
      description:
        'Открыт к сотрудничеству в продуктовых командах и проектах, где важны качество интерфейсов, инженерная дисциплина и скорость доставки.',
      items: [
        {
          label: 'Email',
          value: 'yosinnurov2007@gmail.com',
          href: 'mailto:yosinnurov2007@gmail.com',
        },
        {
          label: 'Телефон',
          value: '+992 93 111 13 73',
          href: 'tel:+992931111373',
        },
        {
          label: 'Локация',
          value: 'Ayni 71/1 street, Dushanbe, Tajikistan',
        },
      ],
    },
  },
  en: {
    navigation: [
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'education', label: 'Education' },
      { id: 'contacts', label: 'Contact' },
    ],
    ui: {
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    hero: {
      name: 'Yosin Nurov',
      role: 'Middle Front-end Developer',
      location: 'Dushanbe, Tajikistan',
      summary:
        'Frontend developer with strong expertise in JavaScript, TypeScript, React, and React Native. I build high-performance, scalable, and maintainable products with a clear focus on UX and clean architecture.',
      actions: [
        {
          label: 'Contact by Email',
          href: 'mailto:yosinnurov2007@gmail.com',
          kind: 'primary',
        },
        {
          label: 'Download Resume (PDF)',
          href: '/Yosin_Nurov_Resume.pdf',
          kind: 'secondary',
          download: true,
        },
      ],
      stats: [
        { value: '2+ years', label: 'Commercial experience' },
        { value: 'React + TS', label: 'Core stack' },
        { value: 'Web / Mobile / 3D', label: 'Cross-domain delivery' },
      ],
    },
    about: {
      title: 'Profile',
      paragraphs: [
        'I combine engineering rigor with product thinking: building interfaces that feel modern, stay fast, and scale smoothly as business requirements grow.',
        'Background in teaching and freelance delivery helps me explain complex technical ideas clearly and keep projects moving from requirements to release.',
      ],
    },
    skills: {
      title: 'Technology Stack',
      groups: [
        {
          title: 'Frontend',
          items: [
            'HTML5',
            'CSS3',
            'SASS / SCSS',
            'JavaScript (ES6+)',
            'TypeScript',
            'React',
            'React Native',
            'Three.js',
          ],
        },
        {
          title: 'Backend',
          items: [
            'Node.js',
            'Express.js',
            'Fastify',
            'REST API',
            'Service integration',
          ],
        },
        {
          title: 'Engineering Practice',
          items: [
            'UI/UX',
            'Responsive and cross-browser layout',
            'Performance optimization',
            'Clean and maintainable code',
            'Agile / Scrum',
          ],
        },
        {
          title: 'Tools',
          items: [
            'Git',
            'GitHub',
            'Figma',
            'Photoshop',
            'Graphic design',
          ],
        },
      ],
    },
    experience: {
      title: 'Work Experience',
      items: [
        {
          role: 'Freelance Frontend / Full-Stack Developer',
          company: 'Self-employed',
          location: 'Dushanbe',
          period: 'Jan 2025 — Present',
          bullets: [
            'Develop modern web applications with React, JavaScript, and TypeScript.',
            'Build cross-platform mobile apps with React Native.',
            'Design backend services with Node.js (Express, Fastify) and REST APIs.',
            'Implement interactive 3D experiences with Three.js.',
            'Work directly with clients: requirements, planning, delivery, and support.',
          ],
        },
        {
          role: 'Front-end Developer',
          company: 'Babilon',
          location: 'Dushanbe',
          period: 'Jan 2024 — Jul 2024',
          bullets: [
            'Developed and maintained modern applications using React, JavaScript, and TypeScript.',
            'Built responsive, user-friendly interfaces with HTML5 and CSS3.',
            'Integrated frontend applications with REST APIs.',
            'Improved application performance and UI/UX quality.',
            'Contributed to internal and client-facing team projects.',
          ],
        },
        {
          role: 'Lecturer',
          company: 'Korvoni Umed',
          location: 'Dushanbe',
          period: 'Date not specified',
          bullets: [
            'Taught HTML, CSS, and JavaScript from fundamentals to advanced topics.',
            'Covered modern JavaScript concepts: ES6+, async/await, API integration.',
            'Delivered practical React training and mentored project work.',
            'Prepared coursework, assignments, and post-test assessments.',
            'Provided code reviews and technical guidance.',
          ],
        },
        {
          role: 'Guest Frontend Instructor (2-Day Intensive)',
          company: 'Alif Academy',
          location: 'Dushanbe',
          period: '2-day workshop',
          bullets: [
            'Delivered an intensive workshop on HTML, CSS, and JavaScript.',
            'Introduced DOM manipulation and modern ES6+ concepts.',
            'Guided hands-on coding sessions and provided technical feedback.',
            'Explained frontend architecture fundamentals.',
          ],
        },
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          degree: "Bachelor's Degree (in progress) — Applied Informatics",
          institution: 'Russian-Tajik Slavonic University (RTSU), Dushanbe',
          period: 'Since 2025',
          details: ['Faculty of Natural Sciences.'],
        },
        {
          degree: 'Computer Science and Programming',
          institution: 'Alif Academy',
          period: '2023',
          details: ['Completed with honors.'],
        },
        {
          degree: 'Secondary Art Education',
          institution: 'Aminzoda Art School, Dushanbe',
          period: '2014 — 2024',
          details: ['Art school background strengthens visual design decisions.'],
        },
      ],
    },
    languages: {
      title: 'Languages',
      items: ['Russian', 'English', 'Tajik', 'Japanese'],
    },
    interests: {
      title: 'Interests',
      items: [
        'Graphic design and digital illustration',
        'Music: piano, guitar, violin',
        'Sports: basketball, volleyball, cycling',
        'Fiction and scientific literature',
      ],
    },
    contact: {
      title: 'Contact',
      description:
        'Open to product teams and projects where interface quality, engineering discipline, and delivery speed are critical.',
      items: [
        {
          label: 'Email',
          value: 'yosinnurov2007@gmail.com',
          href: 'mailto:yosinnurov2007@gmail.com',
        },
        {
          label: 'Phone',
          value: '+992 93 111 13 73',
          href: 'tel:+992931111373',
        },
        {
          label: 'Location',
          value: 'Ayni 71/1 street, Dushanbe, Tajikistan',
        },
      ],
    },
  },
};
