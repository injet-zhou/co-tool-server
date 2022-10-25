import * as path from 'path';

export const projectRoot = () => {
  return path.resolve(__dirname, '../../');
};

export const joinPath = (...args: string[]) => {
  return path.join(...args);
};
