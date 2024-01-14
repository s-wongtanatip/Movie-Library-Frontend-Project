const footerItems = [
  "FAQ",
  "Help Center",
  "Account",
  "Media Center",
  "Investor Relations",
  "Jobs",
  "Redeem Gift Cards",
  "Buy Gift Cards",
  "Ways to Watch",
  "Terms of Use",
  "Privacy",
  "Cookie Preferences",
  "Corporate Infomation",
  "Contact Us",
  "Speed Test",
  "Legal Notices",
  "Netflix Originals",
];

const Footer = () => {
  return (
    <footer id="footer">
      <section className="bg-[#151515] px-16 py-20">
        <div className="text-gray-600">Question? Call 1-844-505-2993</div>
        <div className="grid grid-cols-4 gap-5 mt-14">
          {footerItems.map((text) => {
            return (
              <span key={text}>
                <a href="" className="text-gray-600" onClick={e => e.preventDefault()}>
                  {text}
                </a>
              </span>
            );
          })}
        </div>
        <div className="flex justify-end mt-10">
          <div className="flex flex-col">
            <span>Developed by Supasit Wongtanatip</span>
            <span>icons</span>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
