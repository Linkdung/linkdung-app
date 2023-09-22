import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { PlusOutlined } from "@ant-design/icons";
import ModalCreate from "../../components/Modal/create";
import { removeLink } from "../../store/actions";
import "./style/adminPages.css";

const AdminPages = ({ links, removeLink }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleDeleteLink = (index) => {
    removeLink(index);
  };

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container">
      <h1>LinkDung App</h1>
      <div className="add-button">
        <Button
          type="primary"
          aria-label="Add Link"
          onClick={showModal}
          icon={<PlusOutlined />}
        />
      </div>

      <ul>
        {links.map((link, index) => (
          <motion.li
            key={index}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="link-item"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              className="delete-button"
              onClick={() => handleDeleteLink(index)}
            >
              Delete
            </Button>
          </motion.li>
        ))}
      </ul>
      <ModalCreate isOpen={isModalVisible} onClose={handleModalClose} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    links: state.links,
  };
};

export default connect(mapStateToProps, { removeLink })(AdminPages);
