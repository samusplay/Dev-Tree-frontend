//Crear Type para los usuarios igual a la del Backend en express
export type User={
    handle:string
    name:string
    email:string
    password:string
    description:string
    image:string

}
//los pick como solo toman valores especificos no hay que hacer cambios
export type RegisterForm=Pick<User,'handle'|'email'|'name'>&{
    password:string
    password_confirmation:string
}

//Type de login

export type LoginForm=Pick<User,'email'>&{
     password:string
}

export type ProfileForm=Pick<User,'handle'|'description'>

export type SocialNetwork={
    id:number
    name:string
    url:string
    enabled:boolean
}

//usamos pick para heredar sin cambiar el modelo principal

export type DevTreeLink=Pick<SocialNetwork,'name'|'url'|'enabled'>

