//import NewPost from '../components/newpost/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import React from 'react';
import Select from 'react-select';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SAVING_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.posts.create,
  clearErrors: actions.posts.clearErrors,
  context: () => context
});

class NewPost extends React.Component {

  logChange(val) {
    console.log("Selected: " + val);
  }

  render() {
    const options = [
      { value: 'actions', label: '' },
      { value: 'components', label: '' },
      { value: 'containers', label: '' },
      { value: 'configs', label: '' },
      { value: 'methods', label: '' },
      { value: 'publications', label: '' },
    ];
    const {error} = this.props;
    return (
      <div className="new-post">
      <h2>Add New File</h2>
    {error ? <p style={{color: 'red'}}>{error}</p> : null}

        <input ref="titleRef" type="Text" placeholder="Filename" /> <br/>
        <select required>
          {options.map( i => {
            return <option value={i.value}>{i.value}</option>
            })}
        </select>
        <input ref="catRef" type="Text" placeholder="Or new category" /> <br/>
      <hidden ref="pathRef" type="Text" placeholder="path" /> <br/>
      <hidden ref="contentRef" placeholder="Enter your post content." /> <br/>
      <button onClick={this.createPost.bind(this)}>Add New</button>
    </div>
  );
  }

  createPost() {
    const {create} = this.props;
    const {titleRef, contentRef, pathRef, catRef} = this.refs;
    //console.log("refs: " + catRef.value);
    create(titleRef.value, catRef.value);
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewPost);
