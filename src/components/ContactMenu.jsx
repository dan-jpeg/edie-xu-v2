const ContactMenu = ({ contactMenuExpanded }) => {
  return (
    <ul className={`list-none ml-4 pt-2 pb-3 text-xs }`}>
      <p className={`py-[3px]`}>s: New York, USA</p>
      <p className={`py-[3px]`}>
        e: <a href="mailto:ediexxu@gmail.com">ediexxu@gmail.com</a>
      </p>
      <p className={`py-[3px]`}>
        i: <a href="http://instagram.com/e__xu">e__xu</a>
      </p>
    </ul>
  );
};

export default ContactMenu;
