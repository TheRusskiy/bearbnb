import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
Template.newPosting.events({
  'submit form'(event, instance) {
      event.preventDefault()
      let title = event.target.elements.title.value
      let description = event.target.elements.description.value
      var files = event.target.elements.image.files;
      Meteor.call('createPosting', {title, description}, (error, postingId)=>{
          if (error) {
              sAlert.error(error.reason)
          } else {
              let uploadedFiles = []
              for (var i = 0, ln = files.length; i < ln; i++) {
                  var file=new FS.File(files[i])
                  file.userId=Meteor.userId();
                  Images.insert(file, function (err, fileObj) {
                      if (err) {
                          sAlert.error(err.reason)
                      } else {
                          uploadedFiles.push(fileObj._id)
                          if (uploadedFiles.length == files.length) {
                              Meteor.call('updatePosting', postingId, {images: uploadedFiles}, (error, result)=>{
                                  if (error) {
                                      sAlert.error(error.reason)
                                  } else {
                                      FlowRouter.go('myPostings')
                                  }
                              })
                          }
                      }
                  });
              }
          }
      })
  }
});