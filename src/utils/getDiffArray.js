const getDiffArray = (current, other) => [
  other.filter((it) => !current.includes(it)),
  current.filter((it) => !other.includes(it)),
]

export default getDiffArray
