import {dispatchLoading, dispatchSuccess} from '../utils/dispatch';
import database from '@react-native-firebase/database';

export const GET_CONTENTS = 'GET_CONTENTS';

export const getContents = search => {
  return dispatch => {
    // loading
    dispatchLoading(dispatch, GET_CONTENTS);
    // firebase
    if (search) {
      database()
        .ref('contents')
        .orderByChild("name")
        .startAt(search)
        .endAt(search + "\uf8ff")
        .once('value', querySnapsot => {
          // hasil
          let data = querySnapsot.val();
          let dataItem = {...data};
          dispatchSuccess(dispatch, GET_CONTENTS, dataItem);
        })
        .catch(err => {
          alert(err);
        });
    } else {
      database()
        .ref('contents')
        .once('value', querySnapsot => {
          // hasil
          let data = querySnapsot.val();
          let dataItem = {...data};
          dispatchSuccess(dispatch, GET_CONTENTS, dataItem);
        })
        .catch(err => {
          alert(err);
        });
    }
  };
};
