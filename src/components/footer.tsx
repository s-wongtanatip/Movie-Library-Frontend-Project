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
        <div className="hidden sm:block">
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
        </div>
        <div className="min-[425px]:flex min-[425px]:justify-between text-end mt-10">
          <a
            className="opacity-60 h-[50px] aspect-[2.334] hidden min-[425px]:block"
            href="https://developer.themoviedb.org/docs/getting-started"
            target="_blank"
          >
            <TmdbLogo />
          </a>
          <div className="flex flex-col">
            <span className="font-thin">Developed by Supasit Wongtanatip</span>
            <div className="text-3xl flex justify-end items-center">
              <a
                href="https://linkedin.com/in/supasit-wongtanatip-b316a8205"
                target="_blank"
              >
                <TiSocialLinkedin />
              </a>
              <a href="https://github.com/s-wongtanatip" target="_blank">
                <TiSocialGithub className="relative top-[2px]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
