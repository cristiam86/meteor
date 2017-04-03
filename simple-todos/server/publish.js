import { Meteor } from 'meteor/meteor'

Meteor.publish('allusers',
  function allUserPublish () {
    return Meteor.users.find({},
      {fields: {createdAt: 1, username: 1}})
  }
)
