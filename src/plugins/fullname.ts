
function middleInitial (middleName: string): string {
  const midName: string[] = middleName.split(' ')
  let middleInitial = ''
  for (let i = 0; i < midName.length; i++) {
    middleInitial += midName[i].substring(0, 1) + '.'
  }

  return middleInitial
}

function getFullName (firstName: string, middleName: string, lastName: string): string {
  return `${firstName} ${middleInitial(middleName)} ${lastName}`
}

export default getFullName
