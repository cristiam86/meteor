import { Meteor } from 'meteor/meteor'

Meteor.publish('allusers',
  function () {
    return Meteor.users.find()
  }
)
