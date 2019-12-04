import Taro from '@tarojs/taro'

class Star extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: ''
    }
  }

  config = {
    navigationBarTitleText: '收藏'
  }

  componentDidMount() {
    // 当页面装载完成，创建相机的上下文对象
    this.ctx =Taro.createCameraContext()
  }

  takePhoto() {
    // 相机的上下文对象
    const that = this
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        that.setState({
          src: res.tempImagePath
        })
        // 调接口，上传至服务器
      }
    })
  }


  render () {
    let { src }  = this.state
    return (
      <View className='page_star page'>
        <Camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></Camera>
        <View type="primary" onTap={this.takePhoto.bind(this)}>拍照</View>
        <Button>预览</Button>
        <Image mode="widthFix" src="{{src}}"></Image>
      </View>
    )
  }
}

export default Star
