const generateToC = (toc) => {
  if (!toc) {
    return "";
  }
  return `
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#Credits)
  * [License](#License)
  * [Questions](#questions)
  `;
};

const generateLicense = (licenseArr) => {
  return `
  ${licenseArr
    .map(({ license }) => {
      return `
    License used ${license}
    `;
    })
    .join("")}
  `;
};

const generateContact = (contactArr) => {
  return `
  ${contactArr
    .map(({ fullName, email, github }) => {
      return `
    Any questions or inquiries can go to ${email}

    ${fullName}
    https://githbub.com/${github}
    `;
    })
    .join("")}
  `;
};

const generateContr = (contrArr) => {
  return `
  ${contrArr
    .map(({ credits }) => {
      return `
    ${credits}
    `;
    })
    .join("")}
  `;
};

module.exports = (templateData) => {
  const { contact, contrib, license, ...rmBody } = templateData;

  return `
  # ${rmBody.title}

  ## Description

  ${rmBody.description}

  ${generateToC(rmBody.confirmToC)}

  ## Installation

  ${rmBody.installation}


  ## Usage

  ${rmBody.usage}


  ## Credits

  
  ${generateContr(contrib)}


  ## License

  ${generateLicense(license)}


  ## Inquiries

  ${generateContact(contact)}
`;
};
