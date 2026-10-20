import {Link} from "react-router-dom";
import {getPath} from "../App.jsx";
import {ArrowRight, UserRound, Banknote, MapPin} from "lucide-react";

export default function AdsComponent() {
    return (
        <>
            <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                    <UserRound size={30} aria-hidden="true"/>
                    <div className="text-sm text-slate-400">
                        <p className="text-2xl font-extrabold text-white">
                            Услуги остеопата
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Banknote size={30} aria-hidden="true"/>
                    <div className="text-sm text-slate-400">
                        <p className="text-2xl font-extrabold text-white">
                            1500р.
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <MapPin size={30} aria-hidden="true"/>
                    <div className="text-sm text-slate-400">
                        <p className="text-2xl font-extrabold text-white">
                            Санкт-Петербург
                        </p>
                    </div>
                </div>
                <Link
                    to={`${getPath('/ads')}`}
                    className="btn bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"
                >
                    <span>Перейти</span>
                    <ArrowRight size={18} aria-hidden="true"/>
                </Link>
            </div>
        </>
    )
}