
export interface Usuario{
    id?: number,
    nome: string ,
    email: string,
    endereco:{
        cep: number,
        rua: string,
        complemento: string,
        estado: string,
        numero: number,
        bairro: string,
        cidade: string,
    }
  }