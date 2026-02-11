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
    // Custom global toolbar items — visible for doc readers
    direction: { hidden: false },
    theme: { hidden: false },
    mode: { hidden: false },
    locale: { hidden: false },
  },
});
