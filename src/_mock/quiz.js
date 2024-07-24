import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const quiz = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  username: faker.name.fullName(),
  category: sample(['Category 01']),
  noofque: sample(['15']),
  pricemoney: sample(['$100']),
  totaltime: sample(['00:60', '00:60', '00:60', '00:60', '00:60', '00:60', '00:60', '00:60', '00:60', '00:60']),
  action: sample('View More...'),
}));

export default quiz;
