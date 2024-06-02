import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="w-[95%] 800px:w-[85%] m-auto">
      <h1 className={`${styles.title} !text-[35px]`}>Privacy Policy</h1>
      <br />
      <div className="font-Poppins">
        <h2 className={`${styles.title} !text-left`}>Introduction</h2>
        <p className="text-[18px] font-Poppins">
          Welcome to Compile Academy. Your privacy is important to us, and we
          are committed to protecting your personal information. This Privacy
          Policy outlines the types of information we collect, how we use it,
          and the measures we take to ensure your data is secure.
        </p>
        <br />
        <h2 className={`${styles.title} !text-left`}>
          Cookies and Tracking Technologies
        </h2>
        <p className="text-[18px] font-Poppins">
          We use cookies and similar tracking technologies to enhance your
          experience on our platform. Cookies are small data files stored on
          your device. You can control the use of cookies through your browser
          settings.
        </p>
        <br />
        <h2 className={`${styles.title} !text-left`}>Data Security</h2>
        <p className="text-[18px] font-Poppins">
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, disclosure,
          or destruction. However, no method of transmission over the internet
          or electronic storage is completely secure, and we cannot guarantee
          absolute security
        </p>
        <br />
        <h2 className={`${styles.title} !text-left`}>
          How We Use Your Information?
        </h2>
        <p className="text-[18px] font-Poppins">
          We use your personal information to:
        </p>
        <li className="my-1">
          <b>Provide and maintain our services:</b> Ensure the functionality and
          security of our platform.
        </li>
        <li className="my-1">
          <b> Process transactions:</b> Handle payments and deliver course
          materials.
        </li>
        <li className="my-1">
          <b>Communicate with you:</b> Send you updates, newsletters, and
          promotional materials.
        </li>
        <li className="my-1">
          <b>Personalize your experience:</b> Tailor our content and
          recommendations to your interests.
        </li>
        <li className="my-1">
          <b>Improve our services:</b> Analyze usage data to enhance our
          platform and develop new features.
        </li>
        <br />
        <h2 className={`${styles.title} !text-left`}>Contact Us</h2>
        <p className="text-[18px] font-Poppins">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <li className="my-1">
          <b>Email:</b> <a href="mailto:dev.mtalha@gmail.com">help@compileracademy.com</a>
        </li>
        <li className="my-1">
          <b>Addess:</b> Compile Academy, Mars Base 1, Valles Marineris, Mars, Solar System.
        </li>
        <br />
      </div>
    </div>
  );
};

export default Policy;
