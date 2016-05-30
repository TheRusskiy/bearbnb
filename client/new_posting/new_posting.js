import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.newPosting.events({
  'submit form'(event, instance) {
      event.preventDefault()
      let title = event.target.elements.title.value
      let description = event.target.elements.description.value
      Meteor.call('createPosting', {title, description}, (error, result)=>{
          if (error) {
              sAlert.error(error.reason)
          } else {
              console.log(result)
              FlowRouter.go('myPostings')
          }
      })
  }
});