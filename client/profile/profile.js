import { Template } from 'meteor/templating';

Template.profile.onCreated(function(){
    this.subscribe('me')
});

Template.profile.helpers({
    'profile'(){
        if (Meteor.userId()) {
            return Meteor.users.findOne({_id: Meteor.userId()})
        } else {
            return null;
        }
    },
    'firstName'(){
        if (Meteor.userId()) {
            return Meteor.users.findOne({_id: Meteor.userId()}).profile.firstName
        } else {
            return null;
        }
    },
    'lastName'(){
        if (Meteor.userId()) {
            return Meteor.users.findOne({_id: Meteor.userId()}).profile.lastName
        } else {
            return null;
        }
    }
})

Template.profile.events({
    'submit form'(event, instance) {
        event.preventDefault()
        let firstName = event.target.elements.first_name.value
        let lastName = event.target.elements.last_name.value
        Meteor.call('saveProfile', {firstName, lastName}, (error, result)=>{
            if (error) {
                sAlert.error(error.reason)
            }
        })
    }
});