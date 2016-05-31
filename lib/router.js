FlowRouter.route('/', {
    name: 'main',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "allPostings" });
    }
});
FlowRouter.route('/profile', {
    name: 'profile',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "profile" });
    }
});

FlowRouter.route('/my-postings', {
    name: 'myPostings',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "myPostings" });
    }
});
FlowRouter.route('/postings/new', {
    name: 'newPosting',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "newPosting" });
    }
});
FlowRouter.route('/postings/:posting_id', {
    name: 'showPosting',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "showPosting" });
    }
});

FlowRouter.route('/postings/:posting_id/edit', {
    name: 'editPosting',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', { main: "editPosting" });
    }
});
