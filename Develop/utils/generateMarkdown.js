//generates Table of Contents if applicable
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

//generates license data
const generateLicense = (licenseArr) => {
  return `
  ${licenseArr
    .map(({ license }) => {
      return `
    ${license}
    `;
    })
    .join("")}
  `;
};

// generates contact info
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

// generates contributors
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
  console.log(rmBody);

  return `
  # ${rmBody.title}

  ## Description

  ${rmBody.description}

  ${generateToC(rmBody.tocConfirm)}

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
