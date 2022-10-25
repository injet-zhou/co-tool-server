import { projectRoot } from './path';

describe('path', () => {
  it('should be defined', () => {
    const root = projectRoot();
    expect(root).toBeDefined();
  });
});
