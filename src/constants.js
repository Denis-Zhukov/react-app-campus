export const sidebarItems = {
    news: [
        {title: "Общие новости", body: [{to: "/", children: "Ссылка куда-то"}]},
        {
            title: "Активности", body: [
                {to: "/campus/activity/sport", children: "Спорт"},
                {to: "/campus/activity/events", children: "Мероприятия"},
                {to: "/campus/activity/execution", children: "Отработки"},
            ],
        },
        {
            title: "Заселение", body: [
                {to: "/campus/news/campus_new/campus_docs", children: "Порядок заселения"},
            ],
        }],
    rating: [
        {title: "Рейтинговая система", body: [{to: "/", children: "Ссылка куда-то"}]},
        {title: "Список студентов", body: [{to: "/", children: "Ссылка куда-то"}]},
    ],
};

export const navbarItems = [
    {title: "Новости", to: "/campus/news"},
    {title: "Общежития", to: "/campus/campus_info"},
    {title: "Рейтинг", to: "/campus/rating/ratyng_system"},
    {title: "Контакты", to: "/campus/contacts"},
];

export const urls = {

}