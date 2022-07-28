const Header = () => {
  return (
    <header>
      <nav>
        <h1 className="hover">THE DESIGN SHOP</h1>
        <ul>
          <li>
            <a href="/" className="hover">
              Home
            </a>
          </li>
          <li>
            <a href="/weekly" className="hover">
              Weekly Recommendations
            </a>
          </li>
          <li>
            <a href="/add" className="hover">
              Add
            </a>
          </li>
        </ul>
        <div className="row" /* onClick="showMenu()" */>
          <div className="mobilemenu">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
        <div className="slidemenu">
          <ul>
            <li>
              <a href="#top">Weekly Recommendations</a>
            </li>
            <li>
              <a href="#footer">Contact</a>
            </li>
            <li>
              <a href="#top">Add</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
