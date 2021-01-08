module.exports = function(source, map) {
  this.callback(
    null,
    `export default function (Component) {
      Component.__config = ${source}
    }`,
    map
  )
}
