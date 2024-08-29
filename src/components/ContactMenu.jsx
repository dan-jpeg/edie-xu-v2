const ContactMenu = ({ contactMenuExpanded }) => {
  return (
    <ul
      className={`list-none ml-4 pb-3 text-xs leading-normal leading-tight leading-tight}`}
    >
      <p>s: New York, USA</p>
      <p>
        e: <a href="mailto:ediexxu@gmail.com">ediexxu@gmail.com</a>
      </p>
      <p>
        i: <a href="http://instagram.com/e__xu">e__xu</a>
      </p>
    </ul>
  );
};

export default ContactMenu;
