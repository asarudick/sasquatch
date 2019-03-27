import test from 'ava';
import { Config } from './';
import mockConfig from '../../mock/config';

const config = new Config(mockConfig);

test('Config.options returns correct results', t => {
  t.deepEqual(config.options, mockConfig.options);
  t.pass();
});
