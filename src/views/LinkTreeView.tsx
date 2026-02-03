import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateProfile } from "../api/DevTreeAPI";

import DevTreeInput from "../components/DevTreeInput";
import { social } from "../data/social";
import type { SocialNetwork, User } from "../types";
import { isValidUrl } from "../utils";

export default function LinkTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState(social);
    //llamos query client para obtener los datos cachados
    const queryclient = useQueryClient();
    const user: User = queryclient.getQueryData(["user"])!;

    //mandar llamar los links atravez de una mutuacion
    const { mutate } = useMutation({
        //llamamos la funcion
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Actualizado correcatmente");
        },
    });
    //iterar de que redes sociales el usuario ya puso
    useEffect(() => {
        const updateData = devTreeLinks.map((item) => {
            const userlink = JSON.parse(user.links).find(
                (Link: SocialNetwork) => Link.name === item.name,
            );
            if (userlink) {
                return { ...item, url: userlink.url, enabled: userlink.enabled };
            }
            return item;
        });
        //seteamos en el estado
        setDevTreeLinks(updateData);
    }, []);

    //valor que va cambiar el state de las redes sociales
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //detectar que red social estamo esrcibinedom cumpliendo cierta condicion mantiene referencia
        const updatedLinks = devTreeLinks.map((link) =>
            link.name === e.target.name ? { ...link, url: e.target.value } : link,
        );
        setDevTreeLinks(updatedLinks);
    };
    //lo que esta en la base de datos
    const links: SocialNetwork[] = JSON.parse(user.links);

    //vooid no retorna nada ponerlo en los types
    const handleEnableLink = (socialNetwork: string) => {
        //usamos el state para indentificar la red social if a ternario
        const updatedLinks = devTreeLinks.map((link) => {
            if (link.name === socialNetwork) {
                //validar si la url es valida
                if (isValidUrl(link.url)) {
                    return { ...link, enabled: !link.enabled };
                } else {
                    toast.error("URL no valida");
                }
            }
            return link;
        });
        //agregamos al nuevo state
        setDevTreeLinks(updatedLinks);

        //filtro
        let updateItems: SocialNetwork[] = [];
        //añadir id de cada red social acceder al arreglo y traer completo
        const selectedSocialNetwork = updatedLinks.find(
            (link) => link.name === socialNetwork,
        );
        //si estamos habilitando la red social
        if (selectedSocialNetwork?.enabled) {
            //si el elemento ya existe en el arreglo
            const id = links.filter((link) => link.id).length + 1;
            if (links.some((link) => link.name === socialNetwork)) {
                updateItems = links.map((link) => {
                    if (link.name === socialNetwork) {
                        return {
                            ...link,
                            enabled: true,
                            id,
                        };
                    } else {
                        return link;
                    }
                });
            } else {
                const newItem = {
                    //si esta habilitando una red social asignamos id
                    ...selectedSocialNetwork,
                    id,
                };
                updateItems = [...links, newItem];
            }

            //sumar
        } else {
            //si se desahbilita no borre todo el arreglo habilita la posicion en arreglo
            const indexToUpdate = links.findIndex(
                (link) => link.name === socialNetwork,
            );
            updateItems = links.map((link) => {
                if (link.name === socialNetwork) {
                    //red social que estamos desabilitando segun la logica
                    return {
                        //traemos una copia
                        ...link,
                        id: 0,
                        enabled: false,
                    };
                } else if (link.id > indexToUpdate&&(indexToUpdate !==0&&link.id==1)) {
                    return {
                        ...link,
                        id: link.id - 1,
                    };
                } else {
                    return link;
                }
            });
        }
        

        //agregamos a la base de datos
        queryclient.setQueryData(["user"], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updateItems),
            };
        });
    };
    return (
        <div className="space-y-5">
            {devTreeLinks.map((item) => (
                //agregamos el componente con key
                <DevTreeInput
                    key={item.name}
                    item={item}
                    handleUrlChange={handleUrlChange}
                    //pasamos funcion al componente
                    handleEnableLink={handleEnableLink}
                />
            ))}
            <button
                className="bg-cyan-400 p-2 text-lg w-full up uppercase text-slate-600 rounded-lg font-bold "
                //realizamos la mutacion y mandamos un call back para que reciba el evento
                onClick={() => mutate(queryclient.getQueryData(["user"])!)}
            >
                Guardar Cambios
            </button>
        </div>
    );
}
