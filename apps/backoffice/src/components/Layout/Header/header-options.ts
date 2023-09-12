import { PrivateRoutes } from "@/constant-definitions";

type Item = {
    path: string;
    label: string;
};

interface Option {
    title: string;
    role: string[];
    items?: Item[];
}

export const headerOptions: Option[] = [
    {
        title: 'Realty',
        role: ['Desarrollo', 'Management', 'Marketing', 'Finanzas'],
        items: [
            {
                path: PrivateRoutes.PROJECTS,
                label: 'Projects',
            },
            {
                path: PrivateRoutes.LEADS,
                label: 'Tasks',
            },
            {
                path: 'blogs',
                label: 'Blogs',
            },
        ],
    },
];