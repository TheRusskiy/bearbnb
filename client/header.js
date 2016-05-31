import { Template } from 'meteor/templating';

Template.header.helpers({
    loggedIn: function (){
        return !!Meteor.user()
    }
})