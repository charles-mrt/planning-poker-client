export const useGetGameIdFromUrl = () => {
  const pathnameArray = window.location.pathname.split('/')
  const gameIdIndex = pathnameArray.indexOf('games') + 1
  return pathnameArray[gameIdIndex]
}