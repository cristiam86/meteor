import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './todosList.html'
import { Meteor } from 'meteor/meteor'
import { Tasks } from '../../api/tasks'

class TodosListCtrl {
  constructor ($scope) {
    $scope.viewModel(this)
    Meteor.subscribe('allusers')
    this.subscribe('tasks')

    this.hideCompleted = false

    this.helpers({
      tasks () {
        const users = Meteor.users._collection._docs._map
        console.log(users)
        const selector = {}
        // if hide completed is checked
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          }
        }
        // Show newest tasks at the top
        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        })
      },
      incompleteCount () {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count()
      },
      currentUser () {
        return Meteor.user()
      }
    })
  }

  addTask (newTask) {
    // Insert a task
    Meteor.call('tasks.insert', newTask)
    // Clear form
    this.newTask = ''
  }

  setChecked (task) {
    Meteor.call('tasks.setChecked', task._id, !task.checked)
  }

  removeTask (task) {
    Meteor.call('tasks.remove', task._id)
  }

  setPrivate (task) {
    Meteor.call('tasks.setPrivate', task._id, !task.private)
  }
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: template,
    controller: ['$scope', TodosListCtrl]
  })
