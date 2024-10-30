import {InjectorService} from "@tsed/di";
import {Logger} from "@tsed/logger";

import {CliConfiguration} from "../services/index.js";
import {createInjector} from "./createInjector.js";

describe("createInjector", () => {
  it("should create the injector", () => {
    const injector = createInjector();

    expect(injector).toBeInstanceOf(InjectorService);
    expect(injector.settings).toBeInstanceOf(CliConfiguration);
    expect(injector.logger).toBeInstanceOf(Logger);
  });
});
