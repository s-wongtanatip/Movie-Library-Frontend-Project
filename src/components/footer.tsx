/// <reference types="vite-plugin-svgr/client" />
import TmdbLogo from "../assets/tmdb.svg?react";
import { TiSocialGithub, TiSocialLinkedin } from "react-icons/ti";

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
      <section className="bg-[#151515] px-10 py-14">
        <div className="text-gray-600">Question? Call 1-844-505-2993</div>
        <div className="grid grid-cols-4 gap-5 mt-14">
          {footerItems.map((text) => {
            return (
              <span key={text}>
                <a
                  href=""
                  className="text-gray-600"
                  onClick={(e) => e.preventDefault()}
                >
                  {text}
                </a>
              </span>
            );
          })}
        </div>
        <div className="flex justify-between mt-10">
          <div className="opacity-60 h-[50px] aspect-[2.334]">
            <TmdbLogo />
          </div>
          <div className="flex flex-col">
            <span className="font-thin">Developed by Supasit Wongtanatip</span>
            <div className="text-3xl flex justify-end items-center"><TiSocialLinkedin/><TiSocialGithub className="relative top-[2px]"/></div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
