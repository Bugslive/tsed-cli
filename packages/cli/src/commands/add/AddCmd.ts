import {Inject} from "@tsed/di";
import {CliDefaultOptions, CliPlugins, Command, CommandProvider, createSubTasks, ProjectPackageJson, QuestionOptions} from "@tsed/cli-core";

export interface AddCmdOptions extends CliDefaultOptions {
  name: string;
}

@Command({
  name: "add",
  description: "Add cli plugin to the current project",
  args: {
    name: {
      description: "Npm package name of the cli plugin",
      type: String
    }
  }
})
export class AddCmd implements CommandProvider {
  @Inject(CliPlugins)
  cliPlugins: CliPlugins;

  @Inject(ProjectPackageJson)
  packageJson: ProjectPackageJson;

  $prompt(initialOptions: any): QuestionOptions {
    return [
      {
        type: "autocomplete",
        name: "name",
        message: "Which cli plugin ?",
        default: initialOptions.name,
        when: !initialOptions.name,
        source: async (state: any, keyword: string) => {
          return this.cliPlugins.searchPlugins(keyword);
        }
      }
    ];
  }

  async $exec(ctx: AddCmdOptions) {
    this.packageJson.addDevDependency(ctx.name, "latest");

    return [
      {
        title: "Install plugins",
        task: createSubTasks(() => this.packageJson.install(ctx as any), {...ctx, concurrent: false})
      },
      {
        title: "Load plugins",
        task: () => this.cliPlugins.loadPlugins()
      },
      {
        title: "Install plugins dependencies",
        task: createSubTasks(() => this.cliPlugins.addPluginsDependencies(ctx), {...ctx, concurrent: false})
      }
    ];
  }
}
