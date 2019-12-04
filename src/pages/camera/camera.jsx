import Taro from '@tarojs/taro'

export default class CameraPage extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: ''
    }
  }
  componentDidMount() {
    // 创建相机的上下文对象
    this.ctx = Taro.createCameraContext()
  }
  takePhoto() {
    // 抓拍
    const that = this
    this.ctx.takePhoto({
      quality: 'high',
      success(res) {
        that.setState({
          src: res.tempImagePath
        })
        // 把抓拍的图片，上传到我们服务器
      }
    })
  }

  render() {
    let { src } = this.state
    return(
      <View>
        <Camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></Camera>
        <Button type="primary" onTap={this.takePhoto.bind(this)}>拍照</Button>
        <Image mode="widthFix" src="{{src}}"></Image>
      </View>
    )
  }
}
