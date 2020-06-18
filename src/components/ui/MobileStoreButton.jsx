import React from "react";
import { Button, Icon } from "semantic-ui-react";

const iOSUrl =
  "https://apps.apple.com/us/app/adobe-lightroom-photo-editor/id878783582";
const androidUrl =
  "https://play.google.com/store/apps/details?id=com.adobe.lrmobile&hl=en";
const MobileStoreButton = ({ store }) => {
  let logo;
  let url;
  switch (store) {
    case "ios":
      logo = "apple";
      url = iOSUrl;
      break;
    case "android":
      logo = "android";
      url = androidUrl;
      break;
    default:
      logo = "android";
      url = androidUrl;
      break;
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Button icon>
        <Icon name={logo} />
      </Button>
    </a>
  );
};

export default MobileStoreButton;
