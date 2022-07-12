import { NavLink } from "react-router-dom";

export const sidebarItems = [
    {title: "Общие новости", body: (<NavLink to="/">Ссылка куда-то</NavLink>)},
    {
        title: "Активности", body: (
            <>
                <NavLink to="campus/activity/sport">Спорт</NavLink>
                <NavLink to="campus/activity/events">Мероприятия</NavLink>
                <NavLink to="campus/activity/execution">Отработки</NavLink>
            </>
        ),
    },
    {title: "Заселение", body: (<NavLink to="/">Ссылка куда-то</NavLink>)},
];

export const navbarItems = [
    {title: "Новости", to: "/campus/news"},
    {title: "Общежития", to: "/campus/campus_info"},
    {title: "Рейтинг", to: "/campus/rating"},
    {title: "Контакты", to: "/campus/contacts"},
];