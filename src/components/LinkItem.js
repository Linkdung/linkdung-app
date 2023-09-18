import React from 'react';

const LinkItem = ({ link }) => {
  return (
    <div>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {link.title}
      </a>
    </div>
  );
};

export default LinkItem;
