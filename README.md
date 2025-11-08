🧩 User Story 1 — Registro de Proprietário

Como um proprietário,
Eu quero ser capaz de me registrar,
Para que eu possa acessar o sistema e gerenciar os apartamentos que desejo alugar por temporada.

Regras de Negócio:

O e-mail do proprietário deve ser único (não pode haver duplicidade).

Todos os campos obrigatórios (nome, e-mail, senha, telefone) devem ser preenchidos.

A senha deve atender a critérios mínimos de segurança (mínimo de 8 caracteres).


🔐 User Story 2 — Login de Proprietário

Como um proprietário registrado,
Eu quero fazer login no sistema,
Para que eu possa acessar minha conta e gerenciar meus imóveis cadastrados.

Regras de Negócio:

O login deve validar o e-mail e a senha informados.

Apenas proprietários com cadastro ativo podem acessar o sistema.

Após o login bem-sucedido, o sistema deve gerar um token de autenticação (ex.: JWT) para acesso às rotas protegidas.

O token de autenticação deve ter tempo de expiração configurado (por exemplo, 2 horas).

🏘️ User Story 3 — Registro de Imóveis

Como um proprietário autenticado,
Eu quero registrar meus imóveis,
Para que eles fiquem disponíveis para locação por temporada no sistema.

Regras de Negócio:

Somente proprietários autenticados podem cadastrar imóveis.

Cada imóvel deve estar vinculado a um único proprietário.

É obrigatório informar título, descrição, endereço, cidade, valor da diária e status de disponibilidade.

Um mesmo proprietário não pode cadastrar dois imóveis com o mesmo endereço.

🏠 User Story 4 — Lista de Apartamentos Disponíveis

Como um proprietários,
Eu quero visualizar a lista de apartamentos disponíveis,
Para que eu possa conhecer todos os apartamentos disponiveis.

Regras de Negócio:

Apenas imóveis com status “disponível” devem ser exibidos.

Deve ser possível filtrar os resultados por cidade, faixa de preço e tipo de imóvel.

