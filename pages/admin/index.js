import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="admin">
      <div className="admin__nav">
        <div className="admin__nav__item">Admin</div>
        <div className="admin__nav__item">
          <Link className="admin__nav__item__link" href="/admin/travels">
            Travels
          </Link>
        </div>
        <div className="admin__nav__item">
          <Link className="admin__nav__item__link" href="/admin/subscribers">
            Subscribers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
