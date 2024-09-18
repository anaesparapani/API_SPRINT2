// Várivel express importando modulo express
const express = require("express");

//Define uma classe para organizar a lógica da aplicação
class AppController {
  constructor() {
    this.express = express(); //Cria uma nova instância do Express dentro da classe
    this.middlewares(); //Chama o método middlewares para configurar os middlewares
    this.routes(); //Chama o método routes para definir as rotas da API
  }
  middlewares() {
    //Permite que a aplicação receba dados no formato JSON nas requisições
    this.express.use(express.json());
  }
  routes() { // Define as rotas da API
    //URL base:
    const api_routes = require("./routes/api_routes");
    this.express.use("/agen/sala-de-aula/v1", api_routes); //
    // Define uma rota GET para o caminho /health/
    this.express.get("/agen/sala-de-aula/v1/health/", (req, res) => {
      // Verificação de rota se está OK
      res.send({ status: "OK" }); // Confirmação de que a mensagem está OK
    });
  }
}
//Exporta a instância do Express configurada, tornando-a acessível em outros arquivos
module.exports = new AppController().express;
