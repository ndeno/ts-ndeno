type Entity = 
| {type: 'user'}
| {type: 'post'}
| {type: 'comment'}; 

type EntityWithId = {
  [EntityType in Entity['type']]: {
    type: EntityType
  } & Record<`${EntityType}Id`, string>
}[Entity['type']]; 

const userEntity: EntityWithId = {
  type: 'user',
  userId: '1234',
}
const postEntity: EntityWithId = {
  type: 'post',
  postId: '4567',
}