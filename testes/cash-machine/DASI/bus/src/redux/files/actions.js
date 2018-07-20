const filesActions = {
  FILES_UPLOAD: 'FILES_UPLOAD',
  filesUpload: ({resource, endpoint, object, callback}) => ({
    type: filesActions.FILES_UPLOAD,
    resource,
    endpoint,
    object,
    callback
  }),
  FILES_DOWNLOAD: 'FILES_DOWNLOAD',
  filesDownload: ({resource, endpoint, object, filename, optionalParams, callback}) => ({
    type: filesActions.FILES_DOWNLOAD,
    resource,
    endpoint,
    object,
    filename,
    optionalParams,
    callback
  }),
  FILES_ERROR: 'FILES_ERROR',
  FILES_ERROR_FILE: 'FILES_ERROR_FILE'

}

export default filesActions;