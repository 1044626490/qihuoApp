import ImagePicker from "react-native-image-picker";
import Api from '../utils/api'
import showShort from './ToastUtil'

let photoOptions = {
    //底部弹出框选项
    title                       : "请选择",
    cancelButtonTitle           : '取消',
    takePhotoButtonTitle        : '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality                     : 0.75,
    allowEditing                : true,
    noData                      : false,
    storageOptions              : {
        skipBackup: true,
        path      : 'image'
    }
};

const openMycamera = (backFn) =>{
    ImagePicker.showImagePicker(photoOptions,(response) => {
        // console.log('response '+response);
        alert(JSON.stringify(response))
        if(response.didCancel){
            return
        }
        uploadImage(response,backFn)
        // uploadImage(response.uri)
    })
};

const uploadImage = (res,backFn) =>{
    let file = res;
    Api.uploadMyHead(file).then(res => {
        showShort(res.msg);
        return backFn(res.src)
    }).catch(res => {
        showShort(res.msg)
    })
};

// const uploadImage = (uri) =>{
//     let formData = new FormData();
//     let file     = {
//         uri: uri, type: 'multipart/form-data', name: 'image.png'
//     };
//     formData.append('file',file);
//     Api.uploadMyHead(formData).then(res => {
//         showShort(res.msg);
//         alert(JSON.stringify(res));
//         this.setState({
//
//         })
//     }).catch(res => {
//         alert(JSON.stringify(res));
//         showShort(res.msg)
//     })
// }

export default openMycamera
