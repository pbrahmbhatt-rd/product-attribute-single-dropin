export default {
  id: "ProductAttributeSingle",
  name: "Product Attribute (Single)",
  group: "PDP",
  description: "Displays a specific product attribute by attribute_code (e.g., material, color).",
  props: [
    {
      name: "attributeCode",
      type: "string",
      required: true,
      label: "Attribute Code",
      description: "The Magento product attribute code to display (e.g., 'material')."
    },
    {
      name: "label",
      type: "string",
      required: false,
      label: "Label",
      description: "Optional label to show before the attribute value. Defaults to the attribute's label."
    }
  ],
  slots: [
    { name: "Before", description: "Content rendered before the attribute value." },
    { name: "After", description: "Content rendered after the attribute value." }
  ]
};