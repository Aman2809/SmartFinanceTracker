import { dashboard, expenses, transactions, trend } from '../utils/Icon';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/user/dashboard'
    },
    {
        id: 2,
        title: "Incomes",
        icon: trend,
        link: "/user/income"
    },
    {
        id: 3,
        title: "Expenses",
        icon: expenses,
        link: "/user/expense"
    },
];
