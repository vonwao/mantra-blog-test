import React from 'react';
import {injectDeps} from 'react-simple-di';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import MainLayout from '../components/layouts.main/index.jsx';
import PostList from '../containers/postlist';
import FileList from '../containers/filelist.jsx';
import Post from '../containers/post.jsx';
import NewPost from '../containers/newpost.jsx';

export const initRoutes = (context, actions) => {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout);

  console.log("PostList: " + PostList)

  // Move these as a module and call this from a main file
  FlowRouter.route('/files', {
    name: 'file.list',
    action(postId) {
      mount(MainLayoutCtx, {
        content: () => (<FileList postId={postId}/>)
      });
    }
  });

  FlowRouter.route('/', {
    name: 'posts.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });

  FlowRouter.route('/post/:postId', {
    name: 'posts.single',
    action({postId}) {
      mount(MainLayoutCtx, {
        content: () => (<Post postId={postId}/>)
      });
    }
  });

  FlowRouter.route('/new-post', {
    name: 'newpost',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewPost/>)
      });
    }
  });
};
