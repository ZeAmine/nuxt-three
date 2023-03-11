export default async (query) => {
  const { data } = await useSanityQuery(query)

  return data
}
