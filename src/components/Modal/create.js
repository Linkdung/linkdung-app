import React, { useState } from "react";
import { Input, Modal } from "antd";
import { connect } from "react-redux";
import { addLink } from "../../store/actions";

const ModalCreate = ({ isOpen, onClose, onOk, addLink }) => {
  const [link, setLink] = useState({ title: "", url: "" });

  const handleChange = (e) => {
    setLink({ ...link, [e.target.name]: e.target.value });
  };

  const handleAddLink = () => {
    addLink(link);
    setLink({ title: "", url: "" });
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddLink();
    }
  };

  return (
    <div>
      <Modal
        title="Create Profile"
        open={isOpen}
        onCancel={onClose}
        onOk={handleAddLink}
        okText="Add Link"
      >
        <Input
          type="text"
          name="title"
          placeholder="Link Title"
          value={link.title}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Input
          type="url"
          name="url"
          placeholder="Link URL"
          value={link.url}
          onChange={handleChange}
          onKeyPress={handleKeyPress}

        />
      </Modal>
    </div>
  );
};

export default connect(null, { addLink })(ModalCreate);
