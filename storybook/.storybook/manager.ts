import { addons } from 'storybook/manager-api';

addons.setConfig({
  toolbar: {
    title: { hidden: true },       // Hide the story title/path
    zoom: { hidden: true },        // Hide the zoom tool
    eject: { hidden: true },       // Hide the eject (open story in new tab) button
    copy: { hidden: true },        // Hide the copy snippet button
    fullscreen: { hidden: true },  // Hide the fullscreen button
    'storybook/background': { hidden: true }, // Hide the backgrounds addon tool
    'storybook/viewport': { hidden: true },   // Hide the viewport addon tool
    // Hide our custom global toolbar items
    direction: { hidden: true },   // Hide direction switcher
    theme: { hidden: true },       // Hide theme switcher
    mode: { hidden: true },        // Hide mode switcher
    locale: { hidden: true },      // Hide locale switcher
  },
});
