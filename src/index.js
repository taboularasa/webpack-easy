import * as _ from 'lodash';
import { bar } from './bar';
import { foo } from './foo';

console.log(bar('haha'));
_.map(_.range(0, 4), (x) => console.log(foo(x)));
