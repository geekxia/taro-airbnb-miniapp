import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

class User extends Taro.Component {

  config = {
    navigationBarTitleText: '我的'
  }


  render () {
    return (
      <View className='page_star'>
        我的页面
      </View>
    )
  }
}

export default User
