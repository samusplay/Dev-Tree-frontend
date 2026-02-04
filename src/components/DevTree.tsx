import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import type { SocialNetwork, User } from "../types";
import DevTreeLink from "./DevTreeLink";
import Header from './Header';
import NavigationTabs from "./NavigationTabs";

type DevTreeProps = {
    //le pasamos el prop de applayout donde esta ReactQuery
    data: User

}
export default function DevTree({ data }: DevTreeProps) {
    //renderizar links pasamos el valor inicial usar generic para que lo infiera
    const [enabledlinks, setenablelinks] = useState<SocialNetwork[]>(JSON.parse(data.links).
        filter((item: SocialNetwork) => item.enabled))

    //darle el comportamniento reactivo
    useEffect(() => {
        setenablelinks((JSON.parse(data.links).
            filter((item: SocialNetwork) => item.enabled)))

        //cada vez que cambie data ejuctamos el codigo
    }, [data])

    //cachar
    const QueryClient = useQueryClient()
    //la libreria no sabe que devolver para el movimiento dinamico
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        //hacer un comprobacion si puede ser null
        if (over && over.id) {
            //indetificar posicion previa
            const prevIndex = enabledlinks.findIndex(link => link.id === active.id)
            //donde se suelta
            const newIndex = enabledlinks.findIndex(link => link.id === over.id)
            //setearlo con su valor previo
            const order = arrayMove(enabledlinks, prevIndex, newIndex)
            //convertimos 
            setenablelinks(order)

            //recuperar lo que estamos habilitando
            const disableLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)

            //escribir de nuevo el cache
            const links = order.concat(disableLinks)

            QueryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links)
                }

            })

        }


    }



    return (
        <>
            <Header />
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />


                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil:/{data.handle}</Link>

                    </div>
                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">{data.handle}</p>

                            {data.image && <img src={data.image} alt=' Imagen perfil' className="mx-auto max-w-[250px]" />

                            }
                            <p className="text-center text-lg font-black text-white">{data.description}</p>

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="mt-20 flex flex-col gap-5">
                                    <SortableContext
                                        items={enabledlinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {enabledlinks.map(link => (
                                            //inyectamos componente y pasamos el key debe esperar el valor link
                                            <DevTreeLink key={link.name} link={link} />
                                        ))}

                                    </SortableContext>

                                </div>

                            </DndContext>


                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}