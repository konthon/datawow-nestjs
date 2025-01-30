import * as moduleAlias from 'module-alias';
import * as path from 'path';

const rootPath = path.resolve(__dirname, 'src');
moduleAlias.addAliases({
  src: rootPath,
});
