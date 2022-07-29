import { Command } from "commander";
import figlet from "figlet";
import pkg from '../package.json'

const program = new Command();
program.version(pkg.version);

const logo = figlet.textSync(pkg.name)





const _helpInformation = program.helpInformation

program.helpInformation = function(){
  return `\n${logo}\n${_helpInformation.call(this)}`
}

program.description(pkg.description)

program.parse(process.argv)