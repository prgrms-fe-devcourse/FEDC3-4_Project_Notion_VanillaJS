import { isConstructor } from "../../Helpers/checkError.js";
//import "../../Helpers/env.js";
import dotenv from "dotenv";

dotenv.config();

export default function App({ $target }) {
  isConstructor(new.target);
}
