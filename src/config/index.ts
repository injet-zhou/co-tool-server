import { joinPath, projectRoot } from '../utils/path';

export default () => {
  return {
    logDir: joinPath(projectRoot(), 'log'),
  };
};
