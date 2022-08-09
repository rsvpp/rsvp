import { BaseCommand } from './utils'
import {
  copyFileAndReplace,
  fmtGitRepo,
  getBasename,
  gitUpdate,
  isDirExist,
  isFile,
  runShellSync,
} from '../utils'

type CreateCommandParams = {
  repo: string
  name: string
}

const initShell = 'rsvp-init.sh'
const commandName = 'create'

class CreateCommand extends BaseCommand<CreateCommandParams> {
  options: CreateCommandParams | null = null

  parseParams(options: Partial<CreateCommandParams>) {
    let { repo, name } = options
    if (repo && name) {
      repo = fmtGitRepo(repo)
      this.options = {
        repo,
        name,
      }
    } else {
      this.log.error(`create need repo and name`)
    }
  }

  handleCommand() {
    if (!this.options) return false
    const { repo, name } = this.options
    if (isDirExist(name)) {
      this.log.error(`${name} is exist`)
    }

    const { dirName, isRefresh } = gitUpdate(repo)
    const projectName = getBasename(name)
    this.log.success(`Fetched ${repo} ${isRefresh ? 'refreshed' : 'cache'}`)
    copyFileAndReplace({
      filePath: dirName,
      output: name,
      excludes: [/\.git/g],
      replaceTpl: (e) => e.split('$PROJECT_NAME').join(projectName),
    })

    if (isFile(`${this.options.name}/${initShell}`)) {
      this.log.success(`Executing rsvp-init.sh`)
      runShellSync(`cd ${name} && sh rsvp-init.sh`)
    }
    this.log.success(`Executing success,please run cd ${name}`)
  }
}

const command: CommandInfo<CreateCommandParams> = {
  name: commandName,
  shortcut: 'c',
  description: 'create repository from github template',
  options: [
    {
      name: '-r, --repo <repo>',
      description:
        'Repository name like "cra",${defaultPrefix}-cra, @${defaultOrg}/${defaultPrefix}-cra',
    },
    {
      name: '-n, --name <name>',
      description: 'Name of the project to create',
    },
  ],
  args: ['name'],
  action: (args, options) => {
    const command = new CreateCommand(commandName)
    return command.handler({ ...options, name: args?.name ?? options.name })
  },
}

export default command
