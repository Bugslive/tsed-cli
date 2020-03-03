import {Injectable} from "@tsed/di";
import {pascalCase} from "change-case";
import {basename} from "path";

@Injectable()
export class ClassNamePipe {
  transform(options: {name: string; type: string}) {
    const name = basename(options.name);
    return pascalCase(name + " " + options.type);
  }
}
