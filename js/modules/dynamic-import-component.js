export default function dynamicImportComponent (componentName) {
  return () => {
    return import(`components/${componentName}`)
      .then((result) => {
        return result.default;
      });
  };
}
