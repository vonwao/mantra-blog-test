//import PostList from '../components/postlist/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import React from 'react';

const render = ({posts}) => {
  const groups = _.groupBy(posts, item => {
    return item.cat
  });

  return (
    <div>
      <div className="ui vertical menu">
        {Object.keys(groups).map( key => (
        <div className="item">
          <div className="header">{key}</div>
          <div className="menu">
            {groups[key].map( item => (
            <a className="item" href={`/post/${item._id}`}>{item.title}</a>
              ))}
          </div>
        </div>
          ))}
      </div>
    </div>
  );
}

export const composer = ({context, postId}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {posts});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(render);
