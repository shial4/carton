// Copyright 2020 Carton contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import fs from "fs/promises";
import { WasmRunner } from "./common";

const args = [...process.argv];
args.shift();
args.shift();
const [wasmFile, ...testArgs] = args;

if (!wasmFile) {
  throw Error("No WASM test file specified, can not run tests");
}

const wasmRunner = WasmRunner({ args: testArgs });

const startWasiTask = async () => {
  const wasmBytes = await fs.readFile(wasmFile);

  await wasmRunner.run(wasmBytes, {
    __stack_sanitizer: {
      report_stack_overflow: () => {
        throw new Error("Detected stack-buffer-overflow.");
      },
    },
  });
};

startWasiTask().catch((e) => {
  throw e;
});
