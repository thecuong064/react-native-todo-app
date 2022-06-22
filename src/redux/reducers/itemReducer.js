export const ItemActionTypes = {
  ADD_ITEM: 'item/add',
  EDIT_ITEM: 'item/edit',
  REMOVE_ITEM: 'item/remove',
  ADD_ITEM_SUCCESS: 'item/add_success',
  EDIT_ITEM_SUCCESS: 'item/edit_success',
  REMOVE_ITEM_SUCCESS: 'item/remove_success',
  ADD_ITEM_FAILED: 'item/add_failed',
  EDIT_ITEM_FAILED: 'item/edit_failed',
  REMOVE_ITEM_FAILED: 'item/remove_failed',
  GET_ITEM_LIST: 'item/get_list',
  GET_ITEM_LIST_SUCCESS: 'item/get_list_success',
  GET_ITEM_LIST_FAILED: 'item/get_list_failed',
};

const initialState = {
  data: [],
  error: undefined,
};

export const itemReducer = (state = initialState, action) => {
  const {payload, type} = action;

  switch (type) {
    case ItemActionTypes.ADD_ITEM_SUCCESS:
    case ItemActionTypes.EDIT_ITEM_SUCCESS:
    case ItemActionTypes.REMOVE_ITEM_SUCCESS: {
      return {
        ...state,
      };
    }
    case ItemActionTypes.GET_ITEM_LIST_SUCCESS: {
      return {
        ...state,
        data: payload,
      };
    }
    case ItemActionTypes.ADD_ITEM_FAILED:
    case ItemActionTypes.EDIT_ITEM_FAILED:
    case ItemActionTypes.REMOVE_ITEM_FAILED:
    case ItemActionTypes.GET_ITEM_LIST_FAILED: {
      return {
        ...state,
        error: payload,
      };
    }
    default:
      return state;
  }
};
