const childProcess = require('child_process');

export const runShellSync = (cmd:string,option={})=>{
  return childProcess.execSync(cmd,option)?.toString()?.trim()
}