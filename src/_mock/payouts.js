import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const payouts = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  username: faker.name.fullName(),
  //   status: sample(['active', 'banned']),
  // company: faker.company.name(),
  // isVerified: faker.datatype.boolean(),
  dateandtime: sample([
    '08/08/2023 10:10:15',
    '09/02/2023 10:10:15',
    '08/08/2023 10:10:15',
    '01/03/2023 10:10:15',
    '09/02/2023 10:10:15',
    '01/03/2023 10:10:15',
    '08/08/2023 10:10:15',
    '01/03/2023 10:10:15',
    '09/02/2023 10:10:15',
    '08/08/2023 10:10:15',
  ]),
  action: sample('View More...'),
  caseprice: sample(['$100']),
}));

export default payouts;
