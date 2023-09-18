import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addLink } from '../actions/linkActions';
import LinkList from './LinkList';

const App = ({ links, addLink }) => {
  const [link, setLink] = useState({ title: '', url: '' });

  const handleChange = (e) => {
    setLink({ ...link, [e.target.name]: e.target.value });
  };

  const handleAddLink = () => {
    addLink(link);
    setLink({ title: '', url: '' });
  };

  return (
    <div>
      <h1>LinkDung App</h1>
      <input
        type="text"
        name="title"
        placeholder="Link Title"
        value={link.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="url"
        placeholder="Link URL"
        value={link.url}
        onChange={handleChange}
      />
      <button onClick={handleAddLink}>Add Link</button>

      <LinkList links={links} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    links: state.links,
  };
};

export default connect(mapStateToProps, { addLink })(App);
