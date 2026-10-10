/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROJECT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * To add a new project:
 *   1. Copy one object below and give it a unique `slug` (URL-safe, e.g. "my-project").
 *   2. Fill in `title`, `summary` and `achievements` for BOTH `en` and `ru`.
 *   3. Put images into `src/assets/projects/<slug>/01.png`, `02.png`, ...
 *      (any `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.avif` will be picked up
 *      automatically, sorted by filename).
 *   4. Set `featured: true` to also show it on the Home page (max 3 are shown).
 *
 * You do NOT need to touch any component — everything is data-driven.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const projects = [
  /* ─────────────────────────── Project 1 ─────────────────────────── */
  {
    slug: 'product-version-management',
    featured: true,
    title: {
      en: 'Microservice platform for product version management',
      ru: 'Микросервисная платформа управления версиями продуктов',
    },
    summary: {
      en: 'REST API for a software version control system with optimized PostgreSQL data model and background processing.',
      ru: 'REST API системы контроля версий ПО с оптимизированной моделью данных PostgreSQL и фоновой обработкой.',
    },
    stack: [
      'C#',
      'ASP.NET Core',
      'REST API',
      'gRPC',
      'PostgreSQL',
      'Entity Framework Core',
      'Docker',
      'Kafka',
    ],
    achievements: {
      en: [
        'Designed and developed a REST API for a software version control system, enabling concurrent operation by multiple clients.',
        'Optimized the data model and PostgreSQL queries using Entity Framework Core, achieving a 30% reduction in response times for critical endpoints (based on load testing results).',
        'Implemented background processes to handle long-running operations, offloading the application’s main thread.',
      ],
      ru: [
        'Спроектировал и разработал REST API системы контроля версий ПО, обеспечив параллельную работу нескольких клиентов.',
        'Оптимизировал модель данных и запросы к PostgreSQL через Entity Framework Core, что дало сокращение времени отклика критичных эндпоинтов на 30% (по результатам нагрузочного тестирования).',
        'Реализовал фоновые процессы для длительных операций, разгрузив основной поток приложения.',
      ],
    },
    links: {},
    // Image filenames inside src/assets/projects/<slug>/. Order is not important —
    // files are sorted alphabetically by name (01, 02, 03, ...).
    images: ['01.png', '02.png', '03.png', '04.png'],
  },

  /* ─────────────────────────── Project 2 ─────────────────────────── */
  {
    slug: 'marketplace-microservices',
    featured: true,
    title: {
      en: 'Marketplace — Microservices Pet Project',
      ru: 'Marketplace — pet-проект на микросервисах',
    },
    summary: {
      en: 'Event-driven microservices marketplace prototype built from scratch with Saga and Outbox patterns.',
      ru: 'Прототип маркетплейса на событийно-ориентированных микросервисах с паттернами Saga и Outbox.',
    },
    stack: [
      'ASP.NET Core',
      'RabbitMQ',
      'gRPC',
      'React',
      'Vite',
      'Redis',
      'Docker Compose',
      'Saga',
      'Outbox',
    ],
    achievements: {
      en: [
        'Built a microservices-based pet project from scratch: ASP.NET Core, RabbitMQ (event-driven messaging), gRPC (inter-service communication), React + Vite (frontend), and Docker Compose orchestration.',
        'Implemented Saga and Outbox patterns to ensure data consistency across microservices.',
        'Improved endpoint load performance by 30% using caching (Redis).',
        'Successfully developed a functional marketplace prototype demonstrating distributed system design skills.',
      ],
      ru: [
        'С нуля собрал pet-проект на микросервисах: ASP.NET Core, RabbitMQ (событийный обмен), gRPC (межсервисное взаимодействие), React + Vite (фронтенд), оркестрация через Docker Compose.',
        'Реализовал паттерны Saga и Outbox для обеспечения согласованности данных между микросервисами.',
        'Повысил производительность эндпоинтов под нагрузкой на 30% за счёт кэширования (Redis).',
        'Успешно разработал функциональный прототип маркетплейса, демонстрирующий навыки проектирования распределённых систем.',
      ],
    },
    links: {
      GitHub: 'https://github.com/aPersonskod/MarketPlace',
    },
    images: ['01.png', '02.png', '03.png', '04.png'],
  },

  /* ─────────────────────────── Project 3 ─────────────────────────── */
  {
    slug: 'automated-design-platform',
    featured: true,
    title: {
      en: 'Automated Design Platform (2D Editor)',
      ru: 'Платформа автоматизированного проектирования (2D-редактор)',
    },
    summary: {
      en: '2D editor with automatic equipment placement and shortest-path routing algorithms over obstacles.',
      ru: '2D-редактор с автоматической расстановкой оборудования и алгоритмами поиска кратчайшего пути в обход препятствий.',
    },
    stack: [
      'C#',
      '.NET Framework',
      'Graph algorithms',
      'Matrix algorithms',
      'Clean Architecture',
      'SOLID',
    ],
    achievements: {
      en: [
        'Developed an algorithm for the automatic placement of equipment on the schematic, completely eliminating manual positioning and reducing drawing preparation time from several hours to a maximum of one minute.',
        'Implemented an algorithm to find the shortest/optimal path on a schematic containing obstacles (using a wave algorithm/adjacency matrices), providing the client with a route-planning tool for installers and service engineers.',
        'Refactored legacy module code in accordance with Clean Architecture and SOLID principles, improving testability and reducing the cost of making changes.',
        'Broke down large epics into independent sub-tasks and managed their execution within a team of three developers.',
      ],
      ru: [
        'Разработал алгоритм автоматической расстановки оборудования на схеме, полностью исключивший ручное позиционирование и сокративший время подготовки чертежа с нескольких часов до максимум одной минуты.',
        'Реализовал алгоритм поиска кратчайшего/оптимального пути на схеме с препятствиями (волновой алгоритм/матрицы смежности), предоставив заказчику инструмент прокладки маршрутов для монтажников и сервисных инженеров.',
        'Отрефакторил код legacy-модуля в соответствии с принципами Clean Architecture и SOLID, повысив тестируемость и снизив стоимость внесения изменений.',
        'Декомпозировал крупные эпики на независимые подзадачи и управлял их выполнением в команде из трёх разработчиков.',
      ],
    },
    links: {},
    images: ['01.png', '02.png', '03.png', '04.png'],
  },

  
];

/** Convenience helper used by detail page navigation. */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}