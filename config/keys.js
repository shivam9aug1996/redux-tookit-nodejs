import { keysProd } from "./prod.js";
import { keysDev } from "./dev.js";
let key;
if (process.env.NODE_ENV == "production") {
  key = keysProd;
} else {
  key = keysDev;
}

export default key;
