module.exports = function(source, map) {
  this.callback(
    null,
    `export default function (Component) {
      console.log(${source})
      Component.__config = ${source}
    }`,
    map
  )
}
