import { addAliases } from 'module-alias';
import * as path from 'path';

const rootPath = path.resolve(__dirname, '..', '..', 'src');
addAliases({
  src: rootPath,
});
