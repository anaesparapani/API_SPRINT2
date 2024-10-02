let users = [];
let id_usuarios = 1;

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, senha, nome } = req.body;

    if (!cpf || !email || !senha || !nome) {
      //Verifica se todos os campos estão preenchidos
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(cpf) || cpf.length !== 11) {
      //Verifica se tem só números e se tem 11 dígitos
      return res.status(400).json({
        error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      //Verifica se o email tem o @
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo CPF
    const existingUser = users.find((user) => user.cpf === cpf);
    if (existingUser) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    // Cria e adiciona novo usuário
    const newUser = { id: id_usuarios++, cpf, email, senha, nome };
    users.push(newUser);

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser }); //201 significa cadastrado
  }

  static async getAllUsers(req, res) {
    //Lista todos os usuarios
    return res
      .status(200)
      .json({ message: "Obtendo todos os usuários", users }); //200 significa sucesso
  }

  static async updateUser(req, res) {
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const { id, cpf, email, senha, nome } = req.body;

    // Validar se todos os campos foram preenchidos
    if (!cpf || !email || !senha || !nome) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    // Procurar o indice do usuario no Array 'users' pelo id
    const userIndex = users.findIndex((user) => user.id === id);

    // Se o usuário não for encontrado userIndex equivale a -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    // Atualiza os dados do usuário do Array 'users'
    users[userIndex] = { id, cpf, email, senha, nome };

    return res
      .status(200)
      .json({ message: "Usuário atualizado", user: users[userIndex] });
  }

  static async deleteUser(req, res) {
    // Obtém o parâmetro 'id' da requisição, que é o id do user a ser deletado
    const userId = req.params.id;

    // Procurar o indice do usuario no Array 'users' pelo id
    const userIndex = users.findIndex((user) => user.id == userId);

    // Se o usuário não for encontrado userIndex equivale a -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    //Removendo o usuário do Array 'users'
    users.splice(userIndex, 1);

    return res.status(200).json({ message: "Usuário Apagado" });
  }
};