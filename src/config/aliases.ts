import { addAliases } from 'module-alias';
import * as path from 'path';

const rootPath = path.resolve('src');
addAliases({
  src: rootPath,
});

console.log('PATH: ', path.basename(__dirname));
