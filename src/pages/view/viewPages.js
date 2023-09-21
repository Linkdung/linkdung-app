import React from "react";
import { Skeleton } from "antd";

const ViewPages = ({ loading = true }) => {
  return (
    <div className="container">
      <h1>View Page</h1>
      <ul>
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            {/* Data aktual */}
          </>
        )}
      </ul>
    </div>
  );
};

export default ViewPages;
