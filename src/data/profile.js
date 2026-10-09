/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROFILE DATA
 * Edit this file to change the owner's name, email, and social links.
 * Localized UI text lives in `src/i18n/locales/{en,ru}.json`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: {
    en: 'Turov Andrey',
    ru: 'Туров Андрей'
  },
  availability: '',
  
  // contacts
  location: {
    en: 'Saint-Petersburg',
    ru: 'Санкт-Петербург'
  },
  timezone: 'Europe/Moscow',

  // Used for the "Contact me" buttons (mailto:).
  email: 'turoff.business@yandex.ru',
  emailSubject: 'Job opportunity — Development',

  // Social links — replace the placeholders below.
  github: 'https://github.com/aPersonskod/',
  telegram: 'https://t.me/anderson_tomas',
  phone: '+79657543509',
};

/**
 * Skill groups rendered on the Home page.
 * `key` must match a key in `skills.groups` inside the locale JSON files.
 * The technology names themselves are language-agnostic and are not translated.
 */
export const skillGroups = [
  { key: 'languages', items: ['C#', 'Go', 'JavaScript', 'SQL'] },
  {
    key: 'backend',
    items: ['ASP.NET Core', 'REST API', 'gRPC', 'Entity Framework Core', '.NET Framework'],
  },
  { key: 'frontend', items: ['React', 'Vite', 'HTML/CSS', 'Tailwind', 'WPF', 'Avalonia UI', 'Xamarin Forms'] },
  { key: 'messaging', items: ['Kafka', 'RabbitMQ'] },
  {
    key: 'architecture',
    items: ['Microservices', 'Clean Architecture', 'SOLID', 'Saga', 'Outbox', 'DDD', 'GOF'],
  },
  { key: 'devops', items: ['Docker', 'Docker Compose', 'Git', 'CI/CD'] },
  { key: 'databases', items: ['PostgreSQL', 'MSSQL', 'Redis', 'MongoDB'] },
];