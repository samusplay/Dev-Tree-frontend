//Crear Type para los usuarios igual a la del Backend en express
export type User={
    handle:string
    name:string
    email:string
    password:string

}

export type RegisterForm=Pick<User,'handle'|'email'|'name'>&{
    password:string
    password_confirmation:string
}

//Type de login

export type LoginForm=Pick<User,'email'>&{
     password:string
}