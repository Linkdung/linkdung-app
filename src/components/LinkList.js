import React from 'react';
import { connect } from 'react-redux';
import LinkItem from './LinkItem';

const LinkList = ({ links }) => {
  return (
    <div>
      <h2>Link List</h2>
      {links.length === 0 ? (
        <p>Tidak ada link yang tersedia.</p>
      ) : (
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <LinkItem link={link} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    links: state.links,
  };
};

export default connect(mapStateToProps)(LinkList);
