import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="header">
      <div className="title">
        <Link href="/">
          <a>
            <h1>Alex Gulavskiy</h1>
          </a>
        </Link>
      </div>
      <div className="links">
        <Link href="/travels">
          <a>TRAVELS</a>
        </Link>
        <Link href="/about">
          <a>ABOUT</a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
