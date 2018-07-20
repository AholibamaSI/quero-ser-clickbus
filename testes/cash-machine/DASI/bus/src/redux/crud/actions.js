const crudActions = {
  CRUD_INDEX: 'CRUD_INDEX',
  CRUD_INDEX_SUCCESS: 'CRUD_INDEX_SUCCESS',
  CRUD_INDEX_ERROR: 'CRUD_INDEX_SUCCESS',
  crudIndex: ({resource, page, optionalParams, callback}) => ({
    type: crudActions.CRUD_INDEX,
    resource,
    page,
    optionalParams,
    callback,
  }),
  CRUD_DESTROY: 'CRUD_DESTROY',
  crudDestroy: ({resource, object, callback}) => ({
    type: crudActions.CRUD_DESTROY,
    resource,
    object,
    callback
  }),
  CRUD_UPDATE: 'CRUD_UPDATE',
  /**
   * @param {String} resource name of the resource we're targeting on the server
   * @param {String} paramsName name of the key of the object that will go to the server
   * @param {Object} object information that will be in the body, it has to have
   * and id in order for the url to work correctly
   * @param {String} endpoint when we want to target a specific action in the server
   * @param {Function} callback when the operation finishes it calls this function with
   * the result
   */
  crudUpdate: ({resource, paramsName, object, endpoint, callback}) => ({
    type: crudActions.CRUD_UPDATE,
    resource,
    paramsName,
    object,
    endpoint,
    callback
  }),
  CRUD_CREATE: 'CRUD_CREATE',
  crudCreate: ({resource, paramsName, object, callback}) => ({
    type: crudActions.CRUD_CREATE,
    resource,
    paramsName,
    object,
    callback
  }),
  CRUD_SHOW: 'CRUD_SHOW',
  crudShow: ({resource, object, optionalParams, callback}) => ({
    type: crudActions.CRUD_SHOW,
    resource,
    object,
    optionalParams,
    callback
  }),
  CRUD_GENERIC: 'CRUD_GENERIC',
  crudGeneric: ({ endpoint, method, optionalParams, page, callback }) => ({
    type: crudActions.CRUD_GENERIC,
    endpoint,
    method,
    optionalParams,
    page,
    callback
  }),
  CRUD_CUSTOM: 'CRUD_CUSTOM',
  crudCustom: ({ endpoint, method, paramsName, object, callback }) => ({
    type: crudActions.CRUD_CUSTOM,
    endpoint,      
    method,
    paramsName,
    object,
    callback
  }),
  CRUD_ERROR: 'CRUD_ERROR',
}

export default crudActions;