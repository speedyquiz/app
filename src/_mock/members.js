import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const members = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  username: faker.name.fullName(),
  status: sample(['active', 'banned']),
  // company: faker.company.name(),
  // isVerified: faker.datatype.boolean(),
  register: sample([
    '08/08/2023',
    '09/02/2023',
    '08/08/2023',
    '01/03/2023',
    '09/02/2023',
    '01/03/2023',
    '08/08/2023',
    '01/03/2023',
    '09/02/2023',
    '08/08/2023',
  ]),
  action: sample(['View  Edit  Remove']),
}));

export default members;
