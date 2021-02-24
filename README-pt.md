# Increazy CLI

Ferramenta de linha de comando para gerenciar e desenvolver localmente as pwas criadas no painel da Increazy.

[Veja essa documentação em inglês](./README.md)


## Instalação

Para instalar execute os comandos abaixo:

```bash
yarn global add increazy
# ou
npm install increazy -g

# Na primeira vez, faça o login na sua conta da Increazy
increazy login
```

## Comandos reconhecidos

| Comando  | Ação                                                             |
|----------|------------------------------------------------------------------|
| deploy   | Envia o projeto para deploy                                      |
| end-task | Finaliza a tarefa atual (git merge)                              |
| get      | Baixa o projeto na pasta atual                                   |
| login    | Faz o login na sua conta Increazy                                |
| rebase   | Baixa o projeto online, atualizando o código da tarefa atual     |
| serve    | Inicia um servidor com uma prévia do layout do projeto           |
| sync     | Sincroniza sua tarefa atual                                      |
| task     | Cria ou recupera uma determinada tarefa (git branch)             |
| tasks    | Mostra todas tarefas do projeto, destacando a atual              |
| help     | Mostra ajuda para um comando                                     |


## Fluxo de trabalho

Vamos mostrar brevemente a sequência que você deve seguir para ter um fluxo de trabalho totalmente adaptado ao Git:

1. `increazy get` - a primeira coisa é baixar o projeto, ao baixar deverá colocar a URL do repositório Git previamente criado para o projeto.
2. `increazy task` - crie uma nova tarefa, para que você possa separar seu código de outros desenvolvedores.
3. `increazy rebase` - (opcional) a qualquer momento, você pode executar o rebase para obter todo o código do painel online, então, se algum desenvolvedor tiver editado o projeto no painel, você receberá atualizações.
4. `increazy sync` - (opcional) a qualquer momento você pode sincronizar sua tarefa, se outro desenvolvedor estiver trabalhando nisso ao mesmo tempo você receberá as alterações dele.
5. `increazy serve` - você pode iniciar um servidor local para editar rapidamente algum código, este comando não executa a PWA, executa apenas um código estático semelhante ao layout final.
6. `increazy deploy` - além de testar o layout localmente, você pode enviar sua tarefa para um ambiente de teste, para isso, execute o deploy e escolha um ambiente de teste adequado para fazer deploy das alterações.
7. `increazy end-task` - quando terminar sua tarefa, execute este comando para misturar o código da tarefa com o código do principal projeto.
8. `increazy deploy` - no final da tarefa você provavelmente desejará colocar o código dela em produção, então, execute o deploy novamente, mas agora envie ele diretamente para produção.