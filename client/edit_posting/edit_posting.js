import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
Template.editPosting.events({
  'submit form'(event, instance) {
      event.preventDefault()
      let title = event.target.elements.title.value
      let description = event.target.elements.description.value
      var files = event.target.elements.image.files
      let posting = this
      Meteor.call('updatePosting', posting._id, {title, description}, (error, postingId)=>{
          if (error) {
              sAlert.error(error.reason)
          } else {
              let uploadedFiles = posting.images
              let lengthBefore = posting.images.length
              console.log(files);
              if (files.length === 0) {
                  FlowRouter.go('myPostings')
              }
              for (var i = 0, ln = files.length; i < ln; i++) {
                  var file = new FS.File(files[i])
                  file.userId = Meteor.userId();
                  Images.insert(file, function (err, fileObj) {
                      if (err) {
                          sAlert.error(err.reason)
                      } else {
                          uploadedFiles.push(fileObj._id)
                          if (uploadedFiles.length === files.length + lengthBefore) {
                              Meteor.call('updatePosting', posting._id, {images: uploadedFiles}, (error, result)=>{
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
  },
   'click a.edit-posting-image-remove'(event, instance){
       event.preventDefault()
       Meteor.call('removeImage', {id: this._id, postingId: FlowRouter.current().params.posting_id}, (error, result)=>{
           if (error) {
               sAlert.error(error.reason)
           }
       })
   }
});

Template.editPosting.onCreated(function(){
    this.subscribe('myPostings')
    this.subscribe('images')
});

Template.editPosting.helpers({
    posting: function (){
        return Postings.findOne({_id: FlowRouter.current().params.posting_id})
    },
    imageList: function (){
        let posting = Postings.findOne({_id: FlowRouter.current().params.posting_id})
        if (posting.images) {
            return Images.find({_id: {$in: posting.images}})
        } else {
            return [];
        }
    }
})