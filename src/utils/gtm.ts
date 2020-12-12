import TagManager from 'react-gtm-module'
import {EventType} from 'greenpeace';

export const initializeTagManager = () => {
  const tagManagerArgs = { gtmId: 'GTM-PZMPZ6C' };
  TagManager.initialize(tagManagerArgs);
}

export const pushToDataLayer = (event: EventType) => {
  console.log("Data Layer Event", event)
  // Window.dataLayer.push(event);
}