import type { DevTreeLink } from "../types"

type DevTreeInputProps = {
    //pasamos el objeto no el arreglo
    item: DevTreeLink
}
//va encontrar los prorps en ese Type
export default function DevTreeInput({ item }: DevTreeInputProps) {
    return (
        <div className="bg-white shadow-sm p-5 flex items-center gap-3">
            <div
            className="w-12 h-12 bg-cover"
            style={{backgroundImage:`url('/social/icon_${item.name}.svg')`}}
            ></div>    
            
            <input 
            type="text" 
            className="flex-1 border-gray-100 rounded-lg"/>
        </div>
    )
}