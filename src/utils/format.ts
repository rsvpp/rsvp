export const defaultOrg = 'rsvpp'
export const defaultPrefix = ''

export const fmtGitRepo = (repo = '') => {
  if (repo.includes('/')) return repo
  if (repo.includes(defaultPrefix)) return `${defaultOrg}/${repo}`
  return `${defaultOrg}/${defaultPrefix}-${repo}`
}