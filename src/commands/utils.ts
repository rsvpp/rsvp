import { Logger } from '../utils'

export class BaseCommand<T> {
  options: T | null = null

  commandName = 'base-command'

  log = new Logger()

  parseParams(_: Partial<T>) {
    this.log.error('you call base-command parseParams Function')
  }

  handleCommand() {
    this.log.error('you call base-command handleCommand Function')
  }

  readSingleConfig() {}

  constructor(commandName: string, isIgnoreConfig?: boolean) {
    this.commandName = commandName
    if (!isIgnoreConfig) {
      this.readSingleConfig()
    }
  }

  handler(options: Partial<T>) {
    this.log.start(this.commandName)
    this.parseParams(options)
    const res = this.handleCommand()
    this.log.done()
    return res
  }
}
