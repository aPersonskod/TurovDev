import websiteUrl from '../assets/services/website.png';
import webappUrl from '../assets/services/webapp.png';
import chatbotUrl from '../assets/services/chatbot.png';

export const offeredServices = [
    {
        slug: 'dev-websites',
        title: {
            en: "Landing pages and corporate websites",
            ru: "Лендинги и корпоративные сайты"
        },
        subtitle: {
            en: "Corporate websites, promo pages, and landing pages featuring responsive design, fast loading speeds, and SEO-ready markup.",
            ru: 'Корпоративные сайты, промо-страницы и лендинги с адаптивным дизайном, быстрой загрузкой и SEO-готовой разметкой.'
        },
        image: websiteUrl
    },
    {
        slug: 'dev-webapps',
        title: {
            en: "Web applications",
            ru: "Веб-приложения"
        },
        subtitle: {
            en: "SPAs and complex React interfaces, API integration, authentication, user dashboards, and admin panels.",
            ru: 'SPA и сложные интерфейсы на React, интеграция с API, авторизация, личные кабинеты и админ-панели.'
        },
        image: webappUrl
    },
    {
        slug: 'dev-chatbots',
        title: {
            en: "Chatbots",
            ru: "Чат-боты"
        },
                subtitle: {
            en: "Bots for Telegram, WhatsApp, and websites: request handling, support automation, and CRM integrations.",
            ru: 'Боты для Telegram, WhatsApp и веб-сайтов: приём заявок, автоматизация поддержки, интеграции с CRM.'
        },
        image: chatbotUrl
    },
];