type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

const mockUser: APIResponse = {
  user: {
    userId: '101',
    friendList: {
      count: 12,
      friends: [
        {
          firstName: 'Rory',
          lastName: 'Gallagher',
        },
        {
          firstName: 'John',
          lastName: 'Stones',
        },
      ],
    },
  },
};

// key In Operator
type FriendList = APIResponse['user']['friendList'];
// could also use keyOf

/**
 * Note that you have to use bracket notation,
 * not dot notation, to look up property types when keying in.
 */
function getFriendList(user: APIResponse['user']): FriendList {
  return user.friendList;
}

const mockUserFriendlist = getFriendList(mockUser.user);

console.log(mockUserFriendlist);
