import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Followers = new Mongo.Collection('followers')

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('followers', function () {
    return Followers.find()
  })
}

Meteor.methods({
  'followers.insert' (userId, email) {
    check(userId, String)
    check(email, String)
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

    Followers.insert({
      owner: Meteor.userId(),
      userId: userId,
      email: email
    })
  },

  'followers.remove' (userId) {
    check(userId, String)
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

    Followers.remove({owner: Meteor.userId(), userId: userId})
  }
})
