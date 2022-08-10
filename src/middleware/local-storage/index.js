

function getItems(fieldName) {
  // global items does not necessarily mean products as items, but item as array item.
  let items = localStorage.getItem(fieldName);
  if (items) items = JSON.parse(items)
  if (items && !_isNeedRefreshField(fieldName)) return items;
}

function setItems(fieldName, fieldValue) {
  fieldValue = JSON.stringify(fieldValue)
  localStorage.setItem(fieldName, fieldValue)
}


function updateItems(fieldName, valueToUpdate) {
  let items = getItems(fieldName)

}


function _isNeedRefreshField(fieldName) {
  const refreshField = localStorage.getItem('refresh')
  if (!refreshField) {
   return false;
  }
  return !!refreshField[fieldName];
}


export default {
  getItems,
  setItems
}
