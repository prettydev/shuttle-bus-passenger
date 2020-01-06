import { unionWith } from 'lodash';

export function messagesReducer(state, action): any {
  switch (action.type) {
    case 'add':
      return unionWith(state, action.payload, function(a, b) {
        return a.id === b.id;
      }).sort(function(a, b) {
        const aData = a.data();
        const bData = b.data();

        if (aData.createdAt === null) {
          aData.createdAt = new Date();
        }

        if (bData.createdAt === null) {
          bData.createdAt = new Date();
        }

        return bData.createdAt.seconds - aData.createdAt.seconds;
      });
    default:
      throw new Error('Action type is not implemented!');
  }
}
