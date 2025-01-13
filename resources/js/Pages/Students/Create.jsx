import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { translations } from '@translations';
import { useSelector } from 'react-redux';

export default function AddStudentPage({ auth, classes, classId }) {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        class_id: classId,
        parent_whatsapp: '',
        cycle: 0,
        grades: 0,
        path: 'general',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/dashboard/students', {
            preserveScroll: true,
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const isDark = useSelector((state) => state.theme.darkMode === "dark");
    const language = useSelector((state) => state.language.current);
    const t = translations[language];
    const breadcrumbItems = [
        { label: t['student_management'], href: '/admin/dashboard/students' },
        { label: t['add_student'] }
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t['add_student']} />
            <div className="flex" style={{ height: "calc(100vh - 66px)" }}>
                <main className="flex-1 overflow-y-auto">
                    <div className="py-6">
                        <div className="mx-auto px-4 sm:px-6 md:px-14">
                            <Breadcrumb items={breadcrumbItems} />
                            <h1 className={`text-3xl mt-3 font-bold ${isDark ? 'text-TextLight' : 'text-TextDark'}`}>
                                {t['add_student']}
                            </h1>
                        </div>
                        <div className="mx-auto px-4 sm:px-6 md:px-16 mt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className='flex justify-between gap-6'>
                                        <div className='w-full'>
                                            <InputLabel value={t['student_name']} />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                className={`mt-1 block w-full ${isDark ? 'bg-DarkBG1' : 'bg-TextLight'}`}
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <InputError message={errors.name} className="mt-2" />}
                                        </div>
                                        <div className='w-full'>
                                            <InputLabel value={t['email']} />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                className={`mt-1 block w-full ${isDark ? 'bg-DarkBG1' : 'bg-TextLight'}`}
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            {errors.email && <InputError message={errors.email} className="mt-2" />}
                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-6'>
                                        <div className='w-full'>
                                            <InputLabel value={t['select_class']} />
                                            <select
                                                id="class_id"
                                                name="class_id"
                                                disabled
                                                className={`w-[100%] focus:border-primaryColor focus:ring-primaryColor rounded-md shadow-sm border-none h-[45px] mt-3 ${isDark ? 'bg-DarkBG1 text-TextLight' : 'bg-LightBG1 text-TextDark border-gray-400 border-[0.1px]'} `}
                                                value={data.class_id}
                                                onChange={(e) => setData('class_id', e.target.value)}
                                            >
                                                <option value="" disabled>{t['select_class']}</option>
                                                {classes.map((classItem) => (
                                                    <option key={classItem.id} value={classItem.id}>
                                                        {classItem.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.class_id && <InputError message={errors.class_id} className="mt-2" />}
                                        </div>
                                        <div className='w-full'>
                                            <InputLabel value={t['phone']} />
                                            <TextInput
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                className={`mt-1 block w-full ${isDark ? 'bg-DarkBG1' : 'bg-TextLight'}`}
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            {errors.phone && <InputError message={errors.phone} className="mt-2" />}
                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-6'>
                                        <div className='w-full'>
                                            <InputLabel value={t['parent_whatsapp']} />
                                            <TextInput
                                                id="parent_whatsapp"
                                                type="tel"
                                                name="parent_whatsapp"
                                                className={`mt-1 block w-full ${isDark ? 'bg-DarkBG1' : 'bg-TextLight'}`}
                                                value={data.parent_whatsapp}
                                                onChange={(e) => setData('parent_whatsapp', e.target.value)}
                                            />
                                            {errors.parent_whatsapp && <InputError message={errors.parent_whatsapp} className="mt-2" />}
                                        </div>
                                        <div className='w-full'>
                                            <InputLabel value={t['cycle']} />
                                            <TextInput
                                                id="cycle"
                                                name="cycle"
                                                type="number"
                                                className={`mt-1 block w-full ${isDark ? 'bg-DarkBG1' : 'bg-TextLight'}`}
                                                value={data.cycle}
                                                onChange={(e) => setData('cycle', e.target.value)}
                                            />
                                            {errors.cycle && <InputError message={errors.cycle} className="mt-2" />}
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel value={t['path']} />
                                        <select
                                            id="path"
                                            name="path"
                                            className={`w-[100%] focus:border-primaryColor focus:ring-primaryColor rounded-md shadow-sm border-none h-[45px] mt-3 ${isDark ? 'bg-DarkBG1 text-TextLight' : 'bg-LightBG1 text-TextDark border-gray-400 border-[0.1px]'} `}
                                            value={data.path}
                                            onChange={(e) => setData('path', e.target.value)}
                                        >
                                            <option value="general">{t['general']}</option>
                                            <option value="advanced">{t['advanced']}</option>
                                        </select>
                                        {errors.path && <InputError message={errors.path} className="mt-2" />}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        {t['save']}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}