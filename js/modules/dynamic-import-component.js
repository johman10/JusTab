export default function dynamicImportComponent (componentName, chunkName) {
  // return () => {
  //   new Promise((resolve) =>
  //     require.ensure([`components/${componentName}`], () =>
  //       resolve(require(`components/${componentName}`).default)
  //     , `${chunkName}-${componentName}`)
  //   )
  // };
  return () => {
    return import(`components/${componentName}`)
      .then((result) => {
        return result.default;
      });
  };
}
