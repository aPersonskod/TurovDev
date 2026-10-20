import PageTransition from '../components/PageTransition';
import ContactCard from "./ContactCard.jsx";
import {Globe, Phone} from "lucide-react";
import adsPosterUrl from "../assets/adsPoster.jpg";
import SectionTitle from "./SectionTitle.jsx";

export default function AdsPage() {
    return (
        <PageTransition>
            <div className="container-page py-16 sm:py-20">
                <SectionTitle title='Записывайтесь к Суриковой Екатерине Дмитриевне' />
                <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr]">
                    <div
                        className="relative overflow-hidden border border-slate-800 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-emerald-500/10 shadow-2xl shadow-indigo-500/5">
                        <img
                            src={adsPosterUrl}
                            alt='adsPoster'
                            className="h-full w-full object-cover"
                            width="600"
                            height="600"
                        />
                    </div>
                    <div className="space-y-5">
                        <section>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <ContactCard
                                    icon={Phone}
                                    label='Телефон'
                                    value='+79819541115'
                                    hint='Запись на прием'
                                    copyable
                                />
                                <ContactCard
                                    icon={Phone}
                                    label='Телефон'
                                    value='+78123035000'
                                    hint='Запись на прием'
                                    copyable
                                />
                                <ContactCard
                                    icon={Globe}
                                    label='Сайт'
                                    value='я-здоров.рф'
                                    hint='Запись на прием'
                                    href='https://я-здоров.рф'
                                    external
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}