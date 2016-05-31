Meteor.methods({
    saveProfile: (attrs)=> {
        if (Meteor.isServer) {
            if (!Meteor.userId()) throw new Meteor.Error('login-required', 'You need to be logged in!')
            if (!attrs.firstName || !attrs.lastName) throw new Meteor.Error('form-error', 'Please fill in all the fields')
        }
        Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.firstName': attrs.firstName, 'profile.lastName': attrs.lastName}})
    }
})