//import PostList from '../components/postlist/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import React from 'react';

const PostList = ({posts}) => (
  <div>
    File list
    <div className='row'>
      <div className='col-xs-3'>
        <div className='reportSections orange'>
          <div className="ui link list">
            {posts.map(post => (
            <li key={post._id}>
              <a href={`/post/${post._id}`}>{post.title}</a>
            </li>
              ))}
          </div>
        </div>
      </div>
  </div>
  </div>
);

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {posts});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(PostList);
