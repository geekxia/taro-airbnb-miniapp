import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

class Message extends Taro.Component {

  config = {
    navigationBarTitleText: '消息'
  }


  render () {
    return (
      <View className='page_star'>
        消息页面
      </View>
    )
  }
}

export default Message
