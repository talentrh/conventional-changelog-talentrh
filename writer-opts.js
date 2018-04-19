'use strict'

const compareFunc = require(`compare-func`)
const Q = require(`q`)
const readFile = Q.denodeify(require(`fs`).readFile)
const resolve = require(`path`).resolve

module.exports = Q.all([
  readFile(resolve(__dirname, `./templates/template.hbs`), `utf-8`),
  readFile(resolve(__dirname, `./templates/header.hbs`), `utf-8`),
  readFile(resolve(__dirname, `./templates/commit.hbs`), `utf-8`),
  readFile(resolve(__dirname, `./templates/footer.hbs`), `utf-8`)
])
  .spread((template, header, commit, footer) => {
    const writerOpts = getWriterOpts()

    writerOpts.mainTemplate = template
    writerOpts.headerPartial = header
    writerOpts.commitPartial = commit
    writerOpts.footerPartial = footer

    return writerOpts
  })

function getWriterOpts () {
  return {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      commit.notes.forEach(note => {
        note.title = `ALTERAÇÕES CRÍTICAS`
        discard = false
      })

      if (commit.type === `feat`) {
        commit.type = `Funcionalidades`
      } else if (commit.type === `fix`) {
        commit.type = `Correções de Bugs`
      } else if (commit.type === `perf`) {
        commit.type = `Melhorias de performance`
      } else if (commit.type === `migration`) {
        commit.type = `Migração`
      } else if (commit.type === `security`) {
        commit.type = `Segurança`
      } else if (commit.type === `revert`) {
        commit.type = `Reversões`
      } else if (discard) {
        return
      } else if (commit.type === `docs`) {
        commit.type = `Documentação`
      } else if (commit.type === `style`) {
        commit.type = `Estilos`
      } else if (commit.type === `design`) {
        commit.type = `Design`
      } else if (commit.type === `refactor`) {
        commit.type = `Refatoração de código`
      } else if (commit.type === `test`) {
        commit.type = `Testes`
      } else if (commit.type === `build`) {
        commit.type = `Build`
      } else if (commit.type === `ci`) {
        commit.type = `Integração Contínua`
      }

      if (commit.scope === `*`) {
        commit.scope = ``
      }

      if (typeof commit.hash === `string`) {
        commit.hash = commit.hash.substring(0, 7)
      }

      if (typeof commit.subject === `string`) {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g, `[@$1](${context.host}/$1)`)
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })

      return commit
    },
    groupBy: `type`,
    commitGroupsSort: `title`,
    commitsSort: [`scope`, `subject`],
    noteGroupsSort: `title`,
    notesSort: compareFunc
  }
}
