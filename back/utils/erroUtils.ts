import { Response } from "express"

export const handleErrorResponse = (res:Response, error:unknown, message:string = 'Erro interno no servidor')=> {
    console.error(`Erro: ${message}`, error)
    res.status(500).json({error:message})

}