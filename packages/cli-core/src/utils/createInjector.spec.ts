import {InjectorService} from "@tsed/di";
import {Logger} from "@tsed/logger";
import {createInjector} from "./createInjector";
import {CliConfiguration} from "../services";

describe("createInjector", () => {
  it("should create the injector", () => {
    const injector = createInjector();

    expect(injector).toBeInstanceOf(InjectorService);
    expect(injector.settings).toBeInstanceOf(CliConfiguration);
    expect(injector.logger).toBeInstanceOf(Logger);
  });
});
