import {dispatchLoading, dispatchSuccess} from '../utils/dispatch';
import database from '@react-native-firebase/database';

export const GET_DONASI = 'GET_DONASI';

export const getDonasi = (uid) => {
  console.log(uid);
  return dispatch => {
    // loading
    dispatchLoading(dispatch, GET_DONASI);
    // firebase
    database()
      .ref('riwayat')
      .orderByChild('uid')
      .equalTo(uid)
      .once('value', querySnapsot => {
        // hasil
        let data = querySnapsot.val();
        let dataItem = data ? {...data} : ""
        dispatchSuccess(dispatch, GET_DONASI, dataItem);
      })
      .catch(err => {
        alert(err);
      });
  };
};
