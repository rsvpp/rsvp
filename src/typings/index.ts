type ActionArgs<T> = [Record<string, any>, Partial<T>]

interface CommandInfo<T> {
  name: string
  description: string
  shortcut: string
  options?: { name: string; description: string }[]
  action: (...args: ActionArgs<T>) => any
  args?: string[]
}
