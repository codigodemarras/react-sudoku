import { ReactElement } from 'react';

import { CustomIcons } from '../CustomIcons';

import './styles.scss';

function Footer(): ReactElement {
  return (
    <section className="footer">
      <ul className="social-list">
        <li className="social">
          <a href="https://www.linkedin.com/in/walterradduso/" rel="noreferrer" target="_blank">
            <CustomIcons color="#FFFFFF" id="linkedin" />
          </a>
        </li>

        <li className="social">
          <a href="https://github.com/walterradduso" rel="noreferrer" target="_blank">
            <CustomIcons color="#FFFFFF" id="github" />
          </a>
        </li>

        <li className="social">
          <a href="https://twitter.com/walterradduso" rel="noreferrer" target="_blank">
            <CustomIcons color="#FFFFFF" id="twitter" />
          </a>
        </li>
      </ul>

      <div className="message">
        Made with <CustomIcons className="text-w-red" color="#c90e0e" id="heart" /> by
        <span className="font-semibold">Walter Radduso</span> &#169; {new Date().getFullYear()}
      </div>
    </section>
  );
}

export default Footer;
