import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';

export const signIn = userId => ({ type: SIGN_IN, payload: userId });

export const signOut = () => ({ type: SIGN_OUT });

export const createStream = formValues => async (dispatch, getState) => {
  const {
    auth: { userId },
  } = getState();
  dispatch({
    type: CREATE_STREAM,
    payload: (await streams.post('/streams', { ...formValues, userId })).data,
  });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  dispatch({
    type: FETCH_STREAMS,
    payload: (await streams.get('/streams')).data,
  });
};

export const fetchStream = id => async dispatch => {
  dispatch({
    type: FETCH_STREAM,
    payload: (await streams.get(`/streams/${id}`)).data,
  });
};

export const editStream = (id, formValues) => async dispatch => {
  dispatch({
    type: EDIT_STREAM,
    payload: (await streams.patch(`/streams/${id}`, formValues)).data,
  });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
