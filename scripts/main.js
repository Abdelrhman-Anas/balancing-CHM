import { periodic_table } from '../data/data.js'
import { is_it_possible } from './testing.js';
import { electronConfiguration } from './configuration.js'

const first = 'Na';
const second = 'Sn';
const config1 = periodic_table[first];
const config2 = periodic_table[second];

result(config1, config2);
function result(config1, config2) {
  const testResult = is_it_possible(config1, config2, electronConfiguration);
}