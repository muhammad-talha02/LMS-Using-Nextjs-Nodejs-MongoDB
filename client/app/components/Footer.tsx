import React from "react";

type Props = {};

const NavLinksData = [
  {
    title: "About",
    links: [
      { label: "Our Story", href: "" },
      { label: "Privacy Policy", href: "" },
      { label: "FAQ", href: "" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Courses", href: "" },
      { label: "My Account", href: "" },
      { label: "Course Dashboard", href: "" },
    ],
  },
  {
    title: "Social Links",
    links: [
      { label: "Youtube", href: "" },
      { label: "Instagram", href: "" },
      { label: "Github", href: "" },
    ],
  },
];

const NavLinks = ({ links }: any) => {
  return (
    <>
      <ul className="flex flex-col gap-2">
        {links?.map((link: any) => {
          return (
            <li className="text-base text-black dark:hover:text-white  dark:text-gray-300 cursor-pointer" key={link.label}>
              {link.label}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="mt-2  border-t-[1px] dark:bg-slate-900 dark:bg-opacity-40 bg-gray-100">
      <div className="w-full 800px:w-[85%] m-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 pb-5">
          {NavLinksData?.map((navlink: any, index: number) => (
            <div className="space-y-3 font-[600]" key={index}>
              <h3 className="text-[20px]">{navlink.title}</h3>
              <NavLinks links={navlink.links} />
            </div>
          ))}

          <div className="space-y-3 font-[600]">
            <h3 className="text-[20px]">Contact us</h3>
            <ul className="flex flex-col gap-2">

            <li className="text-base text-black dark:hover:text-white  dark:text-gray-300 cursor-pointer">+971214568</li>
            <li className="text-base text-black dark:hover:text-white  dark:text-gray-300">Abu Dhabi, UAE</li>
            <li className="text-base text-black dark:hover:text-white  dark:text-gray-300 cursor-pointer">talha@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full py-5 border-t-[1px] dark:border-gray-500">
        <h1 className="text-center">Copyright &copy; 2024 Compile Academy | All Right Reserved</h1>
      </div>
    </footer>
  );
};

export default Footer;
