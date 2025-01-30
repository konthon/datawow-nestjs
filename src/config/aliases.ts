import { addAliases } from 'module-alias';
import * as path from 'path';

const rootPath = path.resolve('var', 'task', 'src');
addAliases({
  src: rootPath,
});

console.log('PATH: ', rootPath, path.basename(__dirname));
