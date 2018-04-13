
> [conventional-changelog](https://github.com/ajoslin/conventional-changelog) [TalentRH](https://github.com/talentrh) preset

## Convenção Viasoft TalentRH

TalentRH [commit message guidelines](https://github.com/talentrh/).

### Implantação em projetos

Primeiro instale o conventional-change-logcli como dependencia de desenvolvimento

```
$ npm install conventional-changelog-cli --save-dev
```

Instale a convenção TalentRH para commits

```
$ npm install talentrh/conventional-changelog-talentrh#master --save-dev
```

Adicione a seguinte linha na seção 'scripts' do package.json do projeto

```
"changelog": "conventional-changelog -o CHANGELOG.md -r 0 -u -p talentrh && sed -i -- 's/Unreleased/Não Liberado/g' CHANGELOG.md"
```

### Uso

```
$ npm run changelog
```

### TO-DO

- [ ] Terminar as traduções
- [ ] Definir a convenção TalentRH com a equipe

### Exemplos

Aparecerá em "Funcionalidades", subseção home

```
feat(home): Adiciona select2 para escolher grupo de postagem direcionada
```

Aparecerá em "Correções de Bugs", com link para a issue se houver #28:

```
fix: Corrige bug na action /add das blueprints do sails

Closes #28
```

Aparecerá em "Melhorias de Performance", e na seção "Alteraçoes Críticas" com as explicações fornecidas:

```
perf(redis): implementa cache de seção

BREAKING CHANGE: O cache mantém a seção do usuário do projeto em uso, se o redis for compartilhado entre os demais, deverá ser implementado um prefixo de ids

```

O commit abaixo e o commit `667ecc1` não aparecerão no changelog se estiverem na mesma release. Se não estiverem, o commit de revert aparecerá na seção `Reversões`

```
revert: feat(pencil): adiciona opção 'graphiteWidth'

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### O formato certo de um commit

Uma mensagme de commit contém um **header**, **body** e um **footer**.  O header pode ter um **type**, **scope** e **subject**:


```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

O **header**, já o **scope** é opcional.

### Reverções

 Deve começar com `revert: `, seguido do header do commit sendo revertido. No body deve dizer: `This reverts commit <hash>.`, onde o hash é o SHA do commit sendo revertido.

 > Dica: Use o comando $ git revert SHA

### Type (tipo)

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are `build`, `ci`, `docs` ,`style`, `refactor`, and `test` for non-changelog related tasks.

### Scope (escopo)

O Escopo pode ser qualquer coisa que especifique a relação do commit com o projeto. Exemplo: `usuario`, `avaliação`, `login`, `navegação`

### Subject (Assunto)

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].
