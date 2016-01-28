//import Post from '../components/post/index.jsx';
import FileList from './filelist.jsx'
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import React from 'react';
import Ace from 'react-ace';
import brace from 'brace';
import Editor from '../components/editor/editor.jsx'

const Post = ({post}) => (
  <div className="ui grid">
    <div className="four wide column">
      <FileList />
    </div>
    <div className="eight wide column">
      {post.saving ? <p>Saving...</p> : null}
      <h2>{post.title}</h2>
      <span style={{fontSize: "150%"}}>composer (<input type="Text" placeholder="{context, postId}, onData)" />)</span>
      <Editor />
      <span style={{fontSize: "150%"}}>Component (<input type="Text" placeholder="params" />)</span>
      <Editor />
    </div>
  </div>
);

export const composer = ({context, postId}, onData) => {
  const {Meteor, Collections, Tracker} = context();

  Meteor.subscribe('posts.single', postId, () => {
    const post = Collections.Posts.findOne(postId);
    onData(null, {post});
  });

  // support latency compensation
  //  we don't need to invalidate tracker because of the
  //  data fetching from the cache.
  const postFromCache = Tracker.nonreactive(() => {
    return Collections.Posts.findOne(postId);
  });

  if (postFromCache) {
    onData(null, {post: postFromCache});
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Post);
