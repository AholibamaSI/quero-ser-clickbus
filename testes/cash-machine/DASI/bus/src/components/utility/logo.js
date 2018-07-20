import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config.js';

// export default function({ collapsed, styling }) {
export default function({ collapsed }) {
  return (
    <div
      className="isoLogoWrapper">
      {collapsed
        ? <div>
            <h3>
              <Link to="/dashboard/atm">
                <i className={siteConfig.siteIcon} />
              </Link>
            </h3>
          </div>
        : <h3>
            <Link to="/dashboard/atm">
              {siteConfig.siteName}
            </Link>
          </h3>}
    </div>
  );
}
