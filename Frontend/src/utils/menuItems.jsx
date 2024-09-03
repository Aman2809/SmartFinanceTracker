import { dashboard, expenses, transactions, trend,rental } from '../utils/Icon';

export const menuItems = [
    {
        id: 1,
        title: 'Home',
        icon: rental,
        link: '/'
    },
    {
        id: 2,
        title: 'Dashboard',
        icon: dashboard,
        link: '/user/dashboard'
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/user/income"
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/user/expense"
    },
    {
        id: 5,
        title: "Goals",
        icon: expenses,
        link: "/user/financial-goals"
    },
];
