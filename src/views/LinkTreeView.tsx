import { useState } from "react"
import { social } from "../data/social"
export default function LinkTreeView(){
    const [devTreeLinks,setDevTreeLinks]=useState(social)
    console.log(devTreeLinks)
    return(
        <div>LinkTree</div>
    )
}