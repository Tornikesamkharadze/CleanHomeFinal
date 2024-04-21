import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="მოხდა შეცდომა, გვერდი ვერ მოიძებნა."
    extra={
      <Button type="primary">
        <Link to="/">უკან დაბრუნება</Link>
      </Button>
    }
  />
);

export default NotFoundPage;
