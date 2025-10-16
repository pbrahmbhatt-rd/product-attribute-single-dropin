/*! Copyright 2025 Adobe
All Rights Reserved. */

import { jsxs as h, jsx as hj } from "@dropins/tools/preact-jsx-runtime.js";
import { useState, useEffect, useMemo } from "@dropins/tools/preact-compat.js";
import { classes as cx, Slot } from "@dropins/tools/lib.js";
import { events } from "@dropins/tools/event-bus.js";
import { useText } from "@dropins/tools/i18n.js";
import { g as getFetchedProductData } from "../chunks/getFetchedProductData.js";
import { c as config } from "../chunks/isProductConfigurationValid.js";

const ProductAttributeSingle = ({
  attributeCode,
  label,
  initialData = null,
  scope,
  children,
  slots,
  className,
  ...rest
}) => {
  const [product, setProduct] = useState(initialData);
  const [locale, setLocale] = useState(config.getConfig().defaultLocale || "en-US");
  const { label: defaultLabel } = useText("PDP.Product.Attributes.label");

  const context = useMemo(() => ({ data: product }), [product]);

  useEffect(() => {
    const unsubPdp = events.on("pdp/data", setProduct, { scope });
    const unsubLocale = events.on("locale", setLocale);
    return () => {
      unsubPdp?.off();
      unsubLocale?.off();
    };
  }, [scope]);

  if (!product) return null;

  const attr = (product.attributes || []).find(
    a => a.code === attributeCode || a.id === attributeCode
  );
  const value = attr?.value;

  if (!value) return null;

  return h("div", {
    ...rest,
    className: cx(["pdp-attribute-single", className]),
    children: [
      (label || attr.label || defaultLabel),
      ": ",
      hj("span", { dangerouslySetInnerHTML: { __html: value } }),
      slots?.After && h(Slot, { name: "After", slot: slots.After, context })
    ]
  });
};

ProductAttributeSingle.getInitialData = getFetchedProductData;

export { ProductAttributeSingle as default, ProductAttributeSingle };
