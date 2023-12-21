import distinctColors from 'distinct-colors'

const getArrayOfColors = (amount: number) => {
  const colors = distinctColors({ count: amount })

  return colors.map(color => color.hex());
};

export default {
  getArrayOfColors,
}
