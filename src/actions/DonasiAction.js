import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils/dispatch';
import database from '@react-native-firebase/database';
import { getData } from '../utils/localStorage';

export const GET_DONASI = 'GET_DONASI';

export const getDonasi = () => {
  return dispatch => {
    // loading
    dispatchLoading(dispatch, GET_DONASI);

    getData('user').then((res) => {
      const uid = res.uid
      if (uid) {
        database()
          .ref('riwayat')
          .orderByChild('uid')
          .equalTo(uid)
          .once('value', querySnapsot => {
            // hasil
            let data = querySnapsot.val();
            let dataItem = data ? {...data} : '';
            dispatchSuccess(dispatch, GET_DONASI, dataItem);
          })
          .catch(err => {
            dispatchError(dispatch, GET_DONASI)
          });
      }else{
        dispatchError(dispatch, GET_DONASI)
      }
    })
  };
};
