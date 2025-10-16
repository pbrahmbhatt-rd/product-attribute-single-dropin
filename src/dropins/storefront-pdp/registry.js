import { register } from "@dropins/tools/registry.js";
import ProductAttributeSingle from "./containers/ProductAttributeSingle.js";
import ProductAttributeSingleConfig from "./containers/ProductAttributeSingle.config.js";

register(ProductAttributeSingleConfig.name, ProductAttributeSingle, ProductAttributeSingleConfig);

export { ProductAttributeSingle };