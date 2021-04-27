import "../styles/header.css";

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <span onClick={scrollToTop} className="header">
        🎬 Entertainment Hub 🎥
      </span>
    </div>
  );
};

export default Header;
