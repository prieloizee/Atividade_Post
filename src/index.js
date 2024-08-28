//importa o modulo Express
const express = require('express') 

//Define uma classe para organizar a logica de aplicação
class AppController{

    constructor(){
        //Cria uma nova instancia so Express dentro da classe
        this.express = express();
        //Chama o metodo middleares para configurar os middlears
        this.middlewares();
        //Chama o metodo routes para definir as rotas api
        this.routes();

    }
    middlewares(){
        //Permirtir qua a aplicação receba dados em formato JSON nas requisições
        this.express.use(express.json());
    }

    //Define as rotas da API
    routes(){
        //Essa rota é usada para mostrar as informaçoes
        const users = [];

        this.express.post("/users",(req,res)=>{
            const {id,nome,email,senha} = req.body
            users.push({id,nome,email,senha});
            res.status(200).send({message:"Usuário cadastrado com sucesso"})
        });        


        this.express.post("/auth",(req,res) => {
            const {email,senha} = req.body
            const user = users.find((user) => user.email == email && user.senha == senha);
            if(user) {
                res.status(200).send({message: " Autenticação sucedida"});
            } else{
                res.status(400).send({message:"Usuário não encontrado"});
            }
        });

        this.express.get('/health/',(req, res)=>{
            res.send({ status: "OK", nome: "Priscila" });
        });
    }
}

// Exportando a instacia de express configurada, para que seja acessado em outros arquivos
module.exports = new AppController().express;