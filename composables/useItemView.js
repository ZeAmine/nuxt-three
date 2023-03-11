export default () => {
  const isItemView = useState('isItemView', () => false)

  const toggleItemView = () => {
    isItemView.value = !isItemView.value
  }

  return { isItemView, toggleItemView }
}
