// Main theme export file
// Following atomic design principles

import * as atoms from './atoms';
import * as molecules from './molecules';
import * as organisms from './organisms';

// Export all theme elements
export {
  atoms,
  molecules,
  organisms,
};

// Create a unified theme object
const theme = {
  ...atoms.default,
  ...molecules.default,
  ...organisms.default,
};

export default theme;
