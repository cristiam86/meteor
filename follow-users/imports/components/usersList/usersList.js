import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './usersList.html'

import { Meteor } from 'meteor/meteor'
import { Followers } from '../../api/followers'

class UsersListCtrl {
  constructor ($scope) {
    $scope.viewModel(this)

    this.subscribe('followers')
    Meteor.subscribe('allusers')

    this.helpers({
      users () {
        return Meteor.users.find({_id: {$ne: Meteor.userId()}}, {
          fields: {
            createdAt: 1,
            emails: 1
          },
          sort: {
            createdAt: -1
          }
        }).fetch()
      },

      following () {
        return Followers.find({owner: Meteor.userId()}).fetch()
      },

      currentUser () {
        return Meteor.user()
      }
    })
  }

  checkFollow (following, user) {
    let result = following.findIndex(elem => elem.userId === user._id) === -1
    return result
  }

  addFollower (user) {
    const userId = user._id
    const email = user.emails[0].address
    Meteor.call('followers.insert', userId, email)
  }

  removeFollower (user) {
    const userId = user.userId
    Meteor.call('followers.remove', userId)
  }
}

export default angular.module('usersList', [
  angularMeteor
])
  .component('usersList', {
    templateUrl: template,
    controller: ['$scope', UsersListCtrl]
  })
