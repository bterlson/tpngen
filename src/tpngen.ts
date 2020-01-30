import { promises } from "fs";
import { join, dirname } from "path";

const readFile = promises.readFile;
const readdir = promises.readdir;
const stat = promises.stat;
const SKIP_DIRS = new Set(['node_modules', 'test', 'test-browser', 'dist-test']);

async function* projectSourcemaps(rootPath: string): AsyncIterableIterator<string> {
  const files = await readdir(rootPath, {withFileTypes: true});
  for (const file of files) {
    const filepath = join(rootPath, file.name);

    if (file.isDirectory()) {
      if (SKIP_DIRS.has(file.name)) {
        continue;
      }

      yield* projectSourcemaps(filepath);
    } else {
      if (file.name.endsWith(".js.map")) {
        yield filepath;
      }
    }
  }
}

async function getPackageRoot(filename: string): Promise<string> {
  //console.log('finding package root for', filename);
  const dir = dirname(filename);
  try {
    const pkgPath = join(dir, "package.json");
    //console.log('checking existence of', pkgPath);
    await stat(pkgPath);
    //console.log('exists');
    return dir;
  } catch (e) {
    //console.log('got error' ,e);
    if (e.code === 'ENOENT') {
      return getPackageRoot(dir);
    }

    throw e;
  }

}

const PROJECT_ROOT = "../azure-sdk-for-js/sdk/";

const projects = [

  'storage/storage-file-share'
]

interface ThirdPartySource {
  packageRootPath: string,
  packageJson: any,
  licenseFile: string,
  copyright: string
}
async function main() {
  for(const project of projects) {
    console.log('\n\n### ' + project)
    const root = PROJECT_ROOT + project;

      const seenPackages = new Set();
      for await (const map of projectSourcemaps(root)) {
        console.log('have sourcemap', map);
        const contents = JSON.parse(await readFile(map, "utf-8"));
        const sources = contents.sources;
        for (const source of sources) {
          const sourcePath = join(dirname(map), source);
          const packageRoot = await getPackageRoot(sourcePath);
          const pkgJson = JSON.parse(
            await readFile(join(packageRoot, "package.json"), "utf-8")
          );

          if (pkgJson.name === 'rush-common') {
            console.log('cant find package root for', source);
          }


          if (seenPackages.has(pkgJson.name)) continue;
          seenPackages.add(pkgJson.name);

          if (
            pkgJson.author &&
            JSON.stringify(pkgJson.author).match(/microsoft/i)
          ) {
            if (pkgJson.name === "@azure/core-tracing") {
              console.log("opentelemetry-js");
            }
          } else {
            console.log(pkgJson.name);
          }
        }
      }
  }
}

main().catch(e => console.error(e));